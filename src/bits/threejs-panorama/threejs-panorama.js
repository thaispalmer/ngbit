(function () {
    "use strict";

    angular.module('ngBit.threejs-panorama', []).component('ngBitThreejsPanorama', {
        templateUrl: 'ngBit/threejs-panorama.html',
        bindings: {
            picture: '@',
            libraryUrl: '@',
            width: '@',
            height: '@',
            autoLoad: '<'
        },
        controller: function ($element) {
            var _this = this;

            this.libInit = function () {
                _this.isUserInteracting = false;
                _this.onMouseDownMouseX = 0;
                _this.onMouseDownMouseY = 0;
                _this.lon = 0;
                _this.onMouseDownLon = 0;
                _this.lat = 0;
                _this.onMouseDownLat = 0;
                _this.phi = 0;
                _this.theta = 0;

                // Creating container
                _this.container = angular.element(document.createElement('div'));
                _this.container.css('backgroundColor', '#ccc');
                _this.container.css('width', _this.width + 'px');
                _this.container.css('height', _this.height + 'px');
                $element.append(_this.container);

                // Creating Camera
                _this.camera = new THREE.PerspectiveCamera( 75, _this.container.innerWidth / _this.container.innerHeight, 1, 1100 );
                _this.camera.target = new THREE.Vector3( 0, 0, 0 );

                // Creating Scene
                _this.scene = new THREE.Scene();

                var geometry = new THREE.SphereGeometry( 500, 60, 40 );
                geometry.scale( - 1, 1, 1 );

                var material = new THREE.MeshBasicMaterial( {
                    map: new THREE.TextureLoader().load( _this.picture )
                } );

                _this.mesh = new THREE.Mesh( geometry, material );

                _this.scene.add(_this.mesh);

                _this.renderer = new THREE.WebGLRenderer();
                _this.renderer.setPixelRatio( window.devicePixelRatio );
                _this.renderer.setSize( _this.container[0].innerWidth, _this.container[0].innerHeight );
                _this.container.append( _this.renderer.domElement );
                console.log(_this.container);
            };

            this.$onInit = function () {
                this.autoLoad = this.autoLoad || true;
                this.width = 500;
                this.height = 300;

                if (this.autoLoad === true) {
                    var library = angular.element(document.createElement('script'));
                    library.attr('src', this.libraryUrl || 'https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js');
                    library.on('load', this.libInit);
                    $element.append(library);
                }
            };
        }
    });

})();