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

})();;(function () {
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

})();;(function () {
    "use strict";

    angular.module('ngBit.ng-messages', []).component('ngBitNgMessages', {
        templateUrl: 'ngBit/ng-messages.html',
        bindings: {
            language: '@'
        },
        controller: function () {
            var availableLanguages = [
                'en',
                'pt-br'
            ];
            this.$onInit = function () {
                this.language = this.language || 'en';
                if (availableLanguages.indexOf(this.language) == -1) {
                    throw 'No language file found for "' + this.language + '". Current available languages in ng-bit-ng-messages: ' + availableLanguages.concat();
                }
                else {
                    this.messagesFile = 'ngBit/ng-messages_' + this.language + '.html';
                }
            };
        }
    });

})();;angular.module('ngBit.templates', ['ngBit/bs-form.html', 'ngBit/bs-text-input.html', 'ngBit/ng-messages_en.html', 'ngBit/ng-messages_pt-br.html', 'ngBit/ng-messages.html']);

angular.module("ngBit/bs-form.html", []).run(["$templateCache", function ($templateCache) {
  "use strict";
  $templateCache.put("ngBit/bs-form.html",
    "<form name=\"{{$ctrl.name}}\"\n" +
    "      ng-submit=\"$ctrl.onSubmit\"\n" +
    "      ng-transclude>\n" +
    "</form>");
}]);

angular.module("ngBit/bs-text-input.html", []).run(["$templateCache", function ($templateCache) {
  "use strict";
  $templateCache.put("ngBit/bs-text-input.html",
    "<div class=\"form-group\" ng-class=\"{'has-error': $ctrl.formCtrl.form[$ctrl.name].$invalid}\">\n" +
    "    <label class=\"control-label\" for=\"{{$ctrl.inputId}}\" ng-if=\"$ctrl.label\">{{$ctrl.label}}</label>\n" +
    "    <input class=\"form-control\"\n" +
    "           id=\"{{$ctrl.inputId || $ctrl.name}}\"\n" +
    "           name=\"{{$ctrl.name}}\"\n" +
    "           type=\"{{$ctrl.type || 'text'}}\"\n" +
    "           placeholder=\"{{$ctrl.placeholder}}\"\n" +
    "           minlength=\"{{$ctrl.minlength}}\"\n" +
    "           maxlength=\"{{$ctrl.maxlength}}\"\n" +
    "           ng-model=\"$ctrl.model\"\n" +
    "           ng-required=\"$ctrl.ngRequired\"\n" +
    "           ng-minlength=\"$ctrl.ngMinlength\"\n" +
    "           ng-maxlength=\"$ctrl.ngMaxlength\"\n" +
    "           ng-pattern=\"$ctrl.ngPattern\"\n" +
    "           ng-change=\"$ctrl.ngChange\"\n" +
    "           ng-trim=\"$ctrl.ngTrim\"/>\n" +
    "    <span class=\"help-block\" ng-messages=\"$ctrl.formCtrl.form[$ctrl.name].$error\" ng-transclude></span>\n" +
    "</div>");
}]);

angular.module("ngBit/ng-messages_en.html", []).run(["$templateCache", function ($templateCache) {
  "use strict";
  $templateCache.put("ngBit/ng-messages_en.html",
    "<div ng-message=\"required\">This field is required.</div>\n" +
    "<div ng-message=\"email\">Enter a valid email address.</div>\n" +
    "<div ng-message=\"max\">The value is too high.</div>\n" +
    "<div ng-message=\"maxlength\">The text is too long.</div>\n" +
    "<div ng-message=\"min\">The value is too low.</div>\n" +
    "<div ng-message=\"minlength\">The text is too short.</div>\n" +
    "<div ng-message=\"number\">Enter only numbers.</div>\n" +
    "<div ng-message=\"pattern\">Fill this field correctly.</div>\n" +
    "<div ng-message=\"url\">This URL is not valid.</div>\n" +
    "<div ng-message=\"date\">This date is not valid.</div>\n" +
    "<div ng-message=\"datetimelocal\">This time is not valid.</div>\n" +
    "<div ng-message=\"time\">Enter a valid time.</div>\n" +
    "<div ng-message=\"week\">Enter a valid week.</div>\n" +
    "<div ng-message=\"month\">Enter a valid month.</div>");
}]);

angular.module("ngBit/ng-messages_pt-br.html", []).run(["$templateCache", function ($templateCache) {
  "use strict";
  $templateCache.put("ngBit/ng-messages_pt-br.html",
    "<div ng-message=\"required\">Preencha este campo.</div>\n" +
    "<div ng-message=\"email\">Digite um endereço de e-mail válido.</div>\n" +
    "<div ng-message=\"max\">Digite um valor menor.</div>\n" +
    "<div ng-message=\"maxlength\">Digite um texto mais curto.</div>\n" +
    "<div ng-message=\"min\">Digite um valor maior.</div>\n" +
    "<div ng-message=\"minlength\">Digite um texto mais longo.</div>\n" +
    "<div ng-message=\"number\">Digite apenas números.</div>\n" +
    "<div ng-message=\"pattern\">Preencha este campo corretamente.</div>\n" +
    "<div ng-message=\"url\">Digite um endereço válido.</div>\n" +
    "<div ng-message=\"date\">Digite uma data válida.</div>\n" +
    "<div ng-message=\"datetimelocal\">Digite um horário válido.</div>\n" +
    "<div ng-message=\"time\">Digite um horário válido.</div>\n" +
    "<div ng-message=\"week\">Digite uma semana válida.</div>\n" +
    "<div ng-message=\"month\">Digite um mês válido.</div>");
}]);

angular.module("ngBit/ng-messages.html", []).run(["$templateCache", function ($templateCache) {
  "use strict";
  $templateCache.put("ngBit/ng-messages.html",
    "<div ng-include=\"$ctrl.messagesFile\"></div>");
}]);
;(function () {
    "use strict";

    angular.module('ngBit', [
        'ngBit.templates',
        'ngBit.bs-text-input',
        'ngBit.bs-form',
        'ngBit.ng-messages'
    ]);

})();