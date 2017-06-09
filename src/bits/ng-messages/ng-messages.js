(function () {
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

})();