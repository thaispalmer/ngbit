(function () {
    "use strict";

    angular.module('ngBit.threejs-panorama', []).component('ngBitThreejsPanorama', {
        bindings: {
            picture: '@',
            libraryUrl: '@',
            width: '@',
            height: '@',
            autoLoad: '<',
            autoSpin: '<',
            speed: '<',
            draggable: '<',
            disableZoom: '<'
        },
        controller: function ($element, $window) {
            var _this = this;

            var sceneInit = function () {
                _this.isUserInteracting = false;
                _this.onMouseDownMouseX = 0;
                _this.onMouseDownMouseY = 0;
                _this.lon = 0;
                _this.onMouseDownLon = 0;
                _this.lat = 0;
                _this.onMouseDownLat = 0;
                _this.phi = 0;
                _this.theta = 0;

                // Creating Camera
                _this.camera = new THREE.PerspectiveCamera(75, _this.width / _this.height, 1, 1100);
                _this.camera.target = new THREE.Vector3(0, 0, 0);

                // Creating Scene
                _this.scene = new THREE.Scene();

                // Creating object
                var geometry = new THREE.SphereGeometry(500, 60, 40);
                geometry.scale(-1, 1, 1);

                _this.material = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(_this.picture)
                });

                var mesh = new THREE.Mesh(geometry, _this.material);

                _this.scene.add(mesh);

                // Insert renderer
                _this.renderer = new THREE.WebGLRenderer();
                _this.renderer.setPixelRatio($window.devicePixelRatio);
                _this.renderer.setSize(_this.width, _this.height);
                _this.container.append(_this.renderer.domElement);

                // Add mouse events
                _this.container.on('mousedown', mouseDown);
                $window.document.addEventListener('mousemove', mouseMove);
                $window.document.addEventListener('mouseup', mouseUp);
                _this.container.on('wheel', mouseWheel);

                // Start rendering
                animate();
            };

            var animate = function () {
                $window.requestAnimationFrame(animate);
                update();
            };

            var update = function () {
                if ((_this.isUserInteracting === false) && (_this.autoSpin === true)) {
                    _this.lon += 0.1 * _this.speed;
                }

                _this.lat = Math.max(-85, Math.min(85, _this.lat));
                _this.phi = THREE.Math.degToRad(90 - _this.lat);
                _this.theta = THREE.Math.degToRad(_this.lon);

                _this.camera.target.x = 500 * Math.sin(_this.phi) * Math.cos(_this.theta);
                _this.camera.target.y = 500 * Math.cos(_this.phi);
                _this.camera.target.z = 500 * Math.sin(_this.phi) * Math.sin(_this.theta);

                _this.camera.lookAt(_this.camera.target);

                _this.renderer.render(_this.scene, _this.camera);
            };

            var mouseDown = function (event) {
                event.preventDefault();
                if (_this.draggable === true) {
                    _this.isUserInteracting = true;
                    _this.onPointerDownPointerX = event.clientX;
                    _this.onPointerDownPointerY = event.clientY;
                    _this.onPointerDownLon = _this.lon;
                    _this.onPointerDownLat = _this.lat;
                }
            };

            var mouseMove = function (event) {
                if ((_this.isUserInteracting === true) && (_this.draggable === true)) {
                    _this.lon = (_this.onPointerDownPointerX - event.clientX ) * 0.1 + _this.onPointerDownLon;
                    _this.lat = (event.clientY - _this.onPointerDownPointerY ) * 0.1 + _this.onPointerDownLat;
                }
            };

            var mouseUp = function (event) {
                _this.isUserInteracting = false;
            };

            var mouseWheel = function (event) {
                if (_this.disableZoom === false) {
                    event.preventDefault();
                    _this.camera.fov += event.deltaY * 0.05;
                    _this.camera.updateProjectionMatrix();
                }
            };

            var resize = function () { // @TODO: Use this function to update the container size
                _this.camera.aspect = _this.width / _this.height;
                _this.camera.updateProjectionMatrix();

                _this.container.css('width', _this.width + 'px');
                _this.container.css('height', _this.height + 'px');
                _this.renderer.setSize(_this.width, _this.height);
            };

            this.$onInit = function () {
                this.autoLoad = typeof this.autoLoad === 'undefined' ? true : this.autoLoad;
                this.autoSpin = typeof this.autoSpin === 'undefined' ? true : this.autoSpin;
                this.draggable = typeof this.draggable === 'undefined' ? true : this.draggable;
                this.disableZoom = typeof this.disableZoom === 'undefined' ? false : this.disableZoom;
                this.speed = typeof this.speed === 'undefined' ? 1 : this.speed;
                this.width = this.width || 500;
                this.height = this.height || 300;

                // Creating container
                _this.container = angular.element(document.createElement('div'));
                _this.container.css('width', _this.width + 'px');
                _this.container.css('height', _this.height + 'px');
                $element.append(_this.container);

                // Preload three.js if needed and then initiate scene
                if (this.autoLoad === true) {
                    var library = angular.element(document.createElement('script'));
                    library.attr('src', this.libraryUrl || 'https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js');
                    library.on('load', sceneInit);
                    $element.append(library);
                }
                else if (typeof THREE === 'undefined') {
                    throw 'Three.js is not loaded. It is needed by ng-bit-threejs-panorama. Use property auto-load="true" if needed.';
                }
                else sceneInit();
            };

            this.$onChanges = function (changesObj) {
                // Watch for changes on picture
                if (!changesObj.picture.isFirstChange() && (changesObj.picture.currentValue != changesObj.picture.previousValue)) {
                    _this.material.map.image.src = changesObj.picture.currentValue;
                    _this.material.map.needsUpdate = true;
                }
            };
        }
    });

})();