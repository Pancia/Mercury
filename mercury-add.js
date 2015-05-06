#!/usr/bin/env node
"use strict";

require("colors");

function addBM(newBM) {
    return require("./lib/add.js")(newBM).spread(function(bm, created) {
        if (!created) {
            return console.warn("mercury: That bookmark already exists:\n".red, bm);
        }
        console.log("mercury: Added bookmark:\n", bm);
    });
}

function main(opts) {
    console.log(opts.args);
    return addBM({
        url: opts.args[0],
        tags: opts.tags,
        title: opts.title
    });
}

var program = require("commander");
program
    .option("--tags <tags>",
            "Tags to add to the bookmark")
    .option(" --title <title>",
            "Title to add to the bookmark");

if (require.main === module) {
    program.parse(process.argv);
    main(program);
} else {
    module.exports = function(args) {
        // Commander will strip first two args
        program.parse(["mercury", "add"].concat(args));
        return main(program);
    };
}
