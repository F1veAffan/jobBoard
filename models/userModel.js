const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  u_email: {
    type: String,
    required: true,
  },
  u_password: {
    type: String,
    required: true,
  },
  u_name: {
    type: String,
    default: "",
  },
  u_address: {
    type: String,
    default: "",
  },
  u_phno: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
