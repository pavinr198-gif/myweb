const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

router.use(express.json());

function verifyToken(req, res, next) {
  let token = req.headers.token;

  try {
    if (!token) {
      throw "Unauthorized request";
    }

    const payload = jwt.verify(token, "secret");

    if (!payload) {
      throw "Unauthorized request";
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized request",
    });
  }
}

// ===================
// Student Registration
// ===================
router.post("/register", async (req, res) => {
  try {
    const { registerNo, candidateName, course, email, mark, password } =
      req.body;

    // Check Register Number
    const registerExists = await User.findOne({ registerNo });

    if (registerExists) {
      return res.status(400).json({
        message: "Register Number Already Exists",
      });
    }

    // Check Email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    const newUser = new User({
      registerNo,
      candidateName,
      course,
      email,
      mark,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Student Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Get All Students
// ===================
router.get("/all", verifyToken, async (req, res) => {
  try {
    const students = await User.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Update Student
// ===================
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Student Updated Successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Delete Student
// ===================
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Student Login
// ===================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const payload = {
      email: user.email,
      password: user.password,
    };

    const token = jwt.sign(payload, "secret");

    res.status(200).json({
      message: "Login Successful",
      token: token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;