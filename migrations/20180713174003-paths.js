"use strict";
const PathHelper = require("../helpers/PathsHelper");
const DatabaseHelper = require("../helpers/DatabaseHelper");
const ObjectId = require("mongodb").ObjectID;

const collection = "paths";
const tracksDir = __dirname + "/../database/collections/tracks/";

module.exports = {
  up(db, next) {
    PathHelper.parseGpxsFromDir(tracksDir)
      .then(paths => {
        DatabaseHelper.insert({
          database: db,
          next: next,
          collection: collection,
          docs: paths
        })
          .then(data => next())
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },

  down(db, next) {
    DatabaseHelper.remove({ database: db, collection: collection })
      .then(data => next())
      .catch(err => console.log(err));
  }
};
