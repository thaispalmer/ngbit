(function () {
    "use strict";

    angular.module('ngBit.bs-text-input', []).component('ngBitBsTextInput', {
        templateUrl: 'ngBit/bs-text-input.html',
        transclude: true,
        require: {
            formCtrl: '?^^ngBitBsForm'
        },
        bindings: {
            inputId: '@',
            name: '@',
            label: '@',
            type: '@',
            placeholder: '@',
            minlength: '@',
            maxlength: '@',
            model: '=',
            ngRequired: '<',
            ngMinlength: '<',
            ngMaxlength: '<',
            ngPattern: '<',
            ngChange: '&',
            ngTrim: '<'
        }
    });

})();