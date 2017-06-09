(function () {
    "use strict";

    angular.module('ngBit.bs-form', []).component('ngBitBsForm', {
        templateUrl: 'ngBit/bs-form.html',
        transclude: true,
        bindings: {
            name: '@',
            onSubmit: '&'
        },
        controller: function ($scope) {
            this.$onInit = function () {
                var _this = this;
                $scope.$watch(this.name, function (newVal) {
                    _this.form = newVal;
                });
            };
        }
    });

})();