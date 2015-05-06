#!/usr/bin/env node
"use strict";

function allBMs(args) {
    return require("./lib/all.js")(args).then(function(bms) {
        console.log(bms);
    });
}

function main(args) {
    return allBMs(args.join(","));
}

if (require.main === module) {
    var program = require("commander");
    program.parse(process.argv);
    return main(program.args);
} else {
    module.exports = main;
}
