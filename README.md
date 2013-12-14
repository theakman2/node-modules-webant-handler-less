# node-modules-webant-handler-less

_Require LESS files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it's required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you'd like to use the module outside of webant, install as follows:

    $ npm install webant-handler-less

## Usage

Ensure the `less` handler is present in your webant configuration file. For example:

````json
{
    "entry":"src/js/main.js",
    "dest":"build/main.js",
    "handlers":{
        "less":{
            "compress":true
        }
    }
}
````

You may now `require` LESS files:

````javascript
require("../path/to/styles.less");
````

See the [webant](https://github.com/theakman2/node-modules-webant) module for more information.

## Settings

__`compress`__

Can be either `true` or `false` (default). Controls whether the compiled CSS is compressed.

## Tests [![Build Status](https://travis-ci.org/theakman2/node-modules-webant-handler-less.png?branch=master)](https://travis-ci.org/theakman2/node-modules-webant-handler-less)

    $ npm test