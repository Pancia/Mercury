"use strict";

module.exports = function(tags) {
    var _ = require("lodash");
    var BM = require("../db");
    var debug = require("debug")("lib,all");

    tags = (tags ? tags.split(",") : []);
    debug("tags:", tags);
    return BM.findAll({}, {raw: true}).then(function(bms) {
        return _(bms).filter(function(bm) {
            var bmTags = bm.tags.split(",");
            debug("bmTags", bmTags);
            return _.intersection(bmTags, tags).length === tags.length;
        }).map(_.partial(_.pick, _, ["url", "title", "tags"]))
        .value();
    });
};
