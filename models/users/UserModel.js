var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const RolePermission = require("./RolePermissionModel");

var UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  university: { type: String, required: false },
  birthdate: { type: Date, required: false },
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  rolePermission: [
    {
      type: Schema.Types.ObjectId,
      ref: "RolePermission",
      required: false
    }
  ]
});

module.exports = mongoose.model("users", UserSchema);
