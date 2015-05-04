#!/usr/bin/env node
"use strict";

require("colors");
var prmpt = require("promptly");
var program = require("commander");

program
    .parse(process.argv);

function repl() {
    var choices = ["add", "all", "exit"];
        prmpt.choose("["+choices+"]", choices, function(err, choice) {
            if (err) {
                console.warn("mercury:", err.message.red);
                return repl();
            }
            console.log("choice:", choice);
            if (choice === "exit") {
                return null;
            }
            repl();
        });
}

(function main() {
    repl();
})(program.args);
