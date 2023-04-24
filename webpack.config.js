// Since this is a frontend-only site, I am running this bundler using a
// separate node.js environment.
//
// The reason I must use a bundler instead of directly importing modules in the
// html is that js security requires modules fail with CORS errors when loaded
// locally.

const path = require('path');

module.exports = {
    entry  : "./code/build/index.js",                      // Here the application starts executing and webpack starts bundling
    output : {
        filename: "main.js",                               // the filename template for entry chunks
        path    : path.resolve(__dirname, "public/src/"),  // The target directory for all output files;
                                                           // must be an absolute path (use the Node.js path module)
    },
    devtool: "inline-source-map",                          // inlines SourceMap into original file
    externals: {
        // "chart.js/auto": "Chart"                           // import {Chart} from "chart.js/auto";
    }
}

// Note: the externals is if we install a library using node, but do not wish
// to couple it with the packed js since we will use a cdn/seperate js to
// import the library.


//
// Old README:
// Note: Any ts scripts here can't be modules, i.e.
//  1. They can't use import/export statements.
//  2. Everything declared is in the global scope.
//
// This is mainly because JS module security requirements would cause an attempt
// to load a module via an HTML file opened locally to throw a CORS error.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts
//
// This also means I can compile all the files into a single outfile via TS and
// don't need a bundler like webpack for this one. (Which works well since no
// node...)
// Ref: https://stackoverflow.com/questions/34474651/typescript-compile-to-single-file
//
