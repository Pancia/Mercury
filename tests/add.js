"use strict";

var chai = require("chai");
chai.should();
chai.use(require("chai-as-promised"));
//var sinon = require("sinon");
var addBM = require("../lib/add.js");

describe("testing 'add' command", function() {
    beforeEach(function() {
        return require("../db").reset();
    });
    context("when the user enters 'mercury add <url>'", function() {
        context("given the url is unique", function() {
            it("add the url", function() {
                return addBM({
                    url: "a url",
                    title: "a title",
                    tags: "some,tags"
                }).spread(function(bm, created) {
                    created.should.equal(true);
                    bm.should.contain.keys("url", "title", "tags");
                });
            });
        });
    });
});
