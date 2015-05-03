#!/usr/bin/env node
/*eslint no-underscore-dangle:0*/
"use strict";

var _ = require("lodash");

var DB = require("sequelize");
var db = new DB("database", null, null, {
    dialect: "sqlite",
    storage: "data.db",
    logging: null
});

var BM = db.define("bookmark", {
    tags: {
        type: DB.STRING,
        get: function() {
            var tags = this.getDataValue("tags");
            return tags.split(",");
        }, set: function(val) {
            this.setDataValue("tags", (val ? val : "__tags__"));
        }
    },
    url: {
        type: DB.STRING,
        unique: true
    },
    title: {
        type: DB.STRING,
        set: function(val) {
            this.setDataValue("title", (val ? val : "__title__"));
        }
    }
});

var main = function() {
    var prmpt = require("promptly");
    var program = require("commander");
    var cmdrTabTab = require("commander-tabtab");
    program
        .command("repl")
        .description("enter repl/interactive mode")
        .action(function repl() {
            var choices = ["add", "all", "exit"];
            prmpt.choose("["+choices+"]", choices, function(err, choice) {
                if (err) {
                    console.log(err.message);
                    return repl();
                }
                console.log("choice:", choice);
                if (choice === "exit") {
                    return null;
                } else if (!_.includes(choices, choice)) {
                    console.log("\nmercury: Please enter a valid choice");
                }
                repl();
            });
        });
    program
        .command("add <url>")
        .description("add a bookmark")
        .option("--tags <tags>",
                "Tags to add to the bookmark")
        .option(" --title <title>",
                "Title to add to the bookmark")
        .action(function(url, options) {
            var newBm = {
                url: url,
                tags: options.tags,
                title: options.title
            };
            console.log(newBm);
            BM.find({where: {
                url: url
            }}).then(function(bm) {
                if (!bm) {
                    return BM.create(newBm).then(function(createdBm) {
                        console.log("add-CREATED");
                        console.log(createdBm.get());
                    });
                }
                console.log("add-FOUND");
                console.log(bm.get());
            });
        });
    program
        .command("all [tags]")
        .description("Get all the bookmarks")
        .action(function(tags) {
            tags = (tags ? tags.split(",") : []);
            BM.findAll({}, {raw: true}).then(function(bms) {
                var filteredBms = _(bms).filter(function(bm) {
                    return (_.intersection(bm.tags, tags).length === tags.length);
                }).value();
                console.log(filteredBms);
            });
        });
    cmdrTabTab.init(program, "mercury");
    program.parse(process.argv);
};

if (require.main === module) {
    if (process.argv[2] === "completion") {
        return main();
    }
    return BM.sync().then(function() {
        var bm = {
            tags: "google,itworks",
            url: "http://www.google.com",
            title: "Google"
        };
        return BM.find({
            where: {
                url: bm.url
            }}).then(function(bm) {
            if (!bm) {
                return BM.create(bm);
            }
        });
    }).then(main);
} else {
    module.exports = main;
}
