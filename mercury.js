#!/usr/bin/env node
"use strict";

var main = function() {
    var program = require("commander");
    var cmdrTabTab = require("commander-tabtab");

    program
        .command("repl",       "enter repl/interactive mode")
        .command("add <url>",  "add a bookmark")
        .command("all [tags]", "get all the bookmarks");

    cmdrTabTab.init(program, "mercury");
    program.parse(process.argv);
};

if (require.main === module) {
    return main();
} else {
    module.exports = main;
}
