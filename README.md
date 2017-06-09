# [AngularJS](https://angularjs.org/) 1.x directives for component-based app building

## Description:

This module contain a collection of directives to be used for building a component-based application.

## Installation:

  - Using Bower: `bower install ngbit`
  - Using npm: `npm install ngbit`

## Usage:

Include `ngbit-0.0.2.min.js` in your application.

    <script src="components/ngbit/ngbit-0.0.2.min.js"></script>

And include the module `ngBit` as an dependency to your module.

    var app = angular.module('app', ['ngBit']);

## Dependencies:

This module has no external dependencies except AngularJS itself. 

- - -

## Component List:

### Bootstrap based components:

  * **ng-bit-bs-text-input:** `<input>` with label, validation states and support for [ngMessages](https://docs.angularjs.org/api/ngMessages/directive/ngMessages).
  * **ng-bit-bs-form:** `<form>` that can hold multiple `<bs-text-input>`, passing everything needed for validation.

### Other components:

  * **ng-bit-ng-messages:** A collection of [ngMessages](https://docs.angularjs.org/api/ngMessages/directive/ngMessages) ready to use with multilingual support.

- - -

## Component Documentation:

Todo.