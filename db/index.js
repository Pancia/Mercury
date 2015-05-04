"use strict";

module.exports = (function() {
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
            },
            allowNull: false
        },
        url: {
            type: DB.STRING,
            unique: true,
            allowNull: false
        },
        title: {
            type: DB.STRING,
            set: function(val) {
                this.setDataValue("title", (val ? val : "__title__"));
            },
            allowNull: false
        }
    }, {
        classMethods: {
            reset: function() {
                var self = this;
                return this.sync({force: true}).then(function() {
                    return self.create({
                        url: "I'm a url",
                        title: "I'm a title",
                        tags: "I'm some tags"
                    }).then(function() {
                        return _.times(3, self.newBM);
                    });
                }).map(function(bm) {
                    return self.create(bm);
                });
            },
            newBM: function() {
                var id = _.uniqueId();
                return {
                    url: "url_"+id,
                    title: "title_"+id,
                    tags: "tags_"+id
                };
            }
        }
    });

    return BM;
})();
