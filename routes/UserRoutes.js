var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController.js");
const passport = require("passport");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/edit", UserController.edit);
router.get("/:id", UserController.user);
router.get(
  "/university/paths",
  passport.authenticate("jwt", { session: false }),
  UserController.universityPaths
);
router.post(
  "/path",
  passport.authenticate("jwt", { session: false }),
  UserController.createPath
);
router.get(
  "/path/list",
  passport.authenticate("jwt", { session: false }),
  UserController.paths
)
router.post(
  "/path/:id/geopoint",
  passport.authenticate("jwt", { session: false }),
  UserController.addGeoPointToPath
)
router.get(
  "/path/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getPath
);
router.delete(
  "/path/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.deletePath
);

module.exports = router;
