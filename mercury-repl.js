#!/usr/bin/env node
"use strict";

var Promise = require("bluebird");
var _ = require("lodash");
var prmpt = Promise.promisifyAll(require("promptly"));
var program = require("commander");
require("colors");

program
    .parse(process.argv);

function repl() {
    var choices = ["add", "all", "exit"];
    prmpt.promptAsync("["+choices+"]?").then(function(input) {
        if (input === "exit") {
            return null;
        }

        var inputs = input.split(" ");
        var cmd = _.first(inputs);
        if (!_.contains(choices, cmd)) {
            console.warn("mercury: invalid choice!");
            return repl();
        }

        var args = _.rest(inputs);
        console.log(args);
        require("./mercury-"+ cmd +".js")(args).then(function() {
            return repl();
        });
    });
}

(function main() {
    repl();
})(program.args);
