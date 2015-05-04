#!/usr/bin/env node
"use strict";

require("colors");
var program = require("commander");

program
    .option("--tags <tags>",
            "Tags to add to the bookmark")
    .option(" --title <title>",
            "Title to add to the bookmark")
    .parse(process.argv);

function addBM(newBM) {
    require("./lib/add.js")(newBM).spread(function(bm, created) {
        if (!created) {
            return console.warn("mercury: That bookmark already exists:\n".red, bm);
        }
        console.log("mercury: Added bookmark:\n", bm);
    });
}

(function main(args) {
    addBM({
        url: args[0],
        tags: program.tags,
        title: program.title
    });
})(program.args);
