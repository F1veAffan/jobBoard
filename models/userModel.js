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
    full_name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone_no: {
      type: String,
    },
  },
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
