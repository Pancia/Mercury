"use strict";

var chai = require("chai");
chai.should();
chai.use(require("chai-as-promised"));
//var sinon = require("sinon");
var getAll = require("../lib/all.js");

describe("testing 'all' command", function() {
    beforeEach(function() {
        return require("../db").reset();
    });
    context("when the user enters 'mercury all'", function() {
        it("should return a list of all the bookmarks", function() {
            return getAll().should.eventually
                .be.an("array")
                .have.length(4);
        });
    });
});
