const Path = require("../models/transports/PathModel.js");
module.exports = {
  paths(req, res) {
    Path.find().exec((err, paths) => {
      if (err) res.status(500).send(err);
      res.send(paths);
    });
  },
  prices(req, res) {
    Path.findById(req.params.pathId).exec((err, path) => {
      if (err) res.status(404).send("Path not found");
      else res.send(path.prices);
    });
  }
};