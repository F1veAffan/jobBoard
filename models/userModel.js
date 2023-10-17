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
  u_additional: {
    type: Object,
    default: {full_name: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phone_no: {
      type: String,
      default: "",
    }}
  },
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
