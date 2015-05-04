"use strict";

module.exports = function(newBM) {
    var BM = require("../db");

    return BM.find({where: {
        url: newBM.url
    }}).then(function(bm) {
        if (!bm) {
            return BM.create(newBM).then(function(createdBM) {
                return [createdBM.get(), true];
            });
        }
        return [bm.get(), false];
    });
};
