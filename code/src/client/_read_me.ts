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
