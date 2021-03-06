# node-modules-webant-handler-less

_Require LESS files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

    $ npm install webant-handler-less

## Usage

Ensure the `less` handler is present in your webant configuration file. For example:

````json
{
    "entry":"src/js/main.js",
    "dest":"build/main.js",
    "handlers":["less"]
}
````

You may now `require` LESS files:

````javascript
// Get the compiled CSS.
var css = require("../path/to/styles.less");

// Apply the CSS to the document.
document.head.innerHTML += '<style type="text/css">' + css + '</style>';
````

See the [webant](https://github.com/theakman2/node-modules-webant) module for more information.

## Settings

__`compress`__

Can be either `true` or `false` (default). Controls whether the compiled CSS is compressed.

## Tests [![Build Status](https://travis-ci.org/theakman2/node-modules-webant-handler-less.png?branch=master)](https://travis-ci.org/theakman2/node-modules-webant-handler-less)

Ensure [phantomjs](http://phantomjs.org) is installed and in your PATH, then run:

    $ npm test