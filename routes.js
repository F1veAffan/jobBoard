const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const JWT = require("jsonwebtoken");
const {
  userLogin,
  userSignup,
  verifyToken,
  postJobs,
  getAllPosts,
  updateProfile,
  getProfileData,
  updatePassword,
} = require("./controllers");

router.post("/api/userLogin", userLogin);
router.post("/api/userSignup", userSignup);
router.post("/api/auth/verifyToken", verifyToken);
router.post("/api/postJobs", postJobs);
router.get("/api/getAllJobs", getAllPosts);
router.post("/api/getProfileData", getProfileData);
router.patch("/api/updateProfile", updateProfile);
router.patch("/api/updatePassword", updatePassword);
router.get("/", (req, res) => {
  res.json("hellow");
});

module.exports = router;
