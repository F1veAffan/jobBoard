const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const UserModel = require("./models/userModel");
const PostModel = require("./models/postModel");
require("dotenv").config();

//handle user Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const searchUserResult = await UserModel.findOne({ u_email: email });
  if (
    searchUserResult &&
    (await bcrypt.compare(password, searchUserResult.u_password))
  ) {
    console.log(searchUserResult);

    const token = JWT.sign(
      {
        email: searchUserResult.u_email,
        id: searchUserResult._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ loginStatus: "authorized", jwtToken: token });
  }
};

//Handle user Signup
const userSignup = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 9);

  console.log(hashedPassword);

  const userData = {
    u_email: email,
    u_password: hashedPassword,
  };

  const saveToDatabase = await UserModel.insertMany([userData]);

  if (saveToDatabase) {
    console.log(saveToDatabase);
    res.json({ registerStatus: "registered" });
  }
};

//verfiy JWT - <NOT USED RN>
const verifyToken = async (req, res) => {
  const { cookie } = req.body;

  if (await JWT.verify(cookie, process.env.JWT_SECRET)) {
    console.log(await JWT.verify(cookie, process.env.JWT_SECRET));
    res.json(true);
  }
};

//handle Job posting
const postJobs = async (req, res) => {
  //De-struct data from the front-end
  const { cookie } = req.body;
  const { title, recruiter, salary, type, description } = req.body.jobDetails;

  const owner = await JWT.verify(cookie, process.env.JWT_SECRET);

  const data = {
    title: title,
    company: recruiter,
    salary: salary,
    type: type,
    owner: owner.id,
    description: description,
  };

  const jobPostStatus = await PostModel.insertMany([data]);
  if (jobPostStatus) {
    res.json({ dbStatus: "Done" });
  } else res.json({ err: "Can't save record!" });

  console.log(jobPostStatus);
};

//get all posted jobs
const getAllPosts = async (req, res) => {
  const jobs = await PostModel.find();
  console.log(jobs);
  res.json(jobs);
};

//Get Profile details
const getProfileData = async (req, res) => {
  const { cookie } = req.body;
  const { email } = await JWT.verify(cookie, process.env.JWT_SECRET);
  const data = await UserModel.findOne({ u_email: email });

  const profilInfo = {
    email: data.u_email,
    name: data.u_name,
    address: data.u_address,
    phone_no: data.u_phno,
  };

  console.log(profilInfo);
  res.json(profilInfo);
};

//update Profile
const updateProfile = async (req, res) => {
  console.log(req.body);
  const { cookie } = req.body;
  const { u_name, u_address, u_phno } = req.body.data;

  // const data = {
  //   u_name: u_name,
  //   u_address: u_address,
  //   u_phno: u_phno,
  // };

  const userData  = JWT.verify(cookie, process.env.JWT_SECRET) 
  console.log(userData.email);
  console.log(req.body.data);

  const result = await UserModel.updateOne({u_email: userData.email}, req.body.data);
  if (result.acknowledged) res.json(result.acknowledged);
  console.log(result.acknowledged);
};

module.exports = {
  userLogin,
  userSignup,
  verifyToken,
  postJobs,
  getAllPosts,
  getProfileData,
  updateProfile,
};
