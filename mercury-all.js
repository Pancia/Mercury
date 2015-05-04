#!/usr/bin/env node
"use strict";

var program = require("commander");

program
    .parse(process.argv);

function allBMs(args) {
    require("./lib/all.js")(args).then(function(bms) {
        console.log(bms);
    });
}

(function main(args) {
    allBMs(args.join(","));
})(program.args);
