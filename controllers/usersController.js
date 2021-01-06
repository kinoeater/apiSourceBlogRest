const express = require("express");
const User = require("../models/users.model");
const config = require("../config");
const jwt = require("jsonwebtoken");

const getUser = (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, result) => {
    if (err) res.status(500).json({ msg: err });
    res.status(200).json({
      data: result,
      username: req.params.username,
      msg: "get user operation success",
    });
  });
};

const checkUserName = (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, result) => {
    if (err) res.status(500).json({ msg: err });

    if (result !== null) {
      return res.json({
        Status: true,
        msg: "Bu Kullanıcı adı alınmış",
      });
    } else if (result === null) {
      return res.json({
        Status: false,
        msg: "Bu Kullanıcı adı kullanılabilir",
      });
    }
  });
};

const checkEmail = (req, res, next) => {
    User.findOne({ email: req.params.email }, (err, result) => {
      if (err) res.status(500).json({ msg: err });
  
      if (result !== null) {
        return res.json({
          Status: true,
          msg: "Bu email adı daha önce kullanılmış olabilir",
        });
      } else if (result === null) {
        return res.json({
          Status: false,
          msg: "Bu email kullanılabilir",
        });
      }
    });
  };

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
};

const deleteUser = (req, res, next) => {
  User.findOneAndDelete({ username: req.params.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    const msg = {
      msg: "User Deleted success",
      username: req.params.username,
    };
    return res.status(200).json(msg);
  });
};

const updatePassword = (req, res, next) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { $set: { password: req.body.password } },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err });

      return res.status(200).json({
        msg: "password successfully updated",
        username: req.params.username,
        Status: true,
      });
    }
  );
};

const registerUser = (req, res, next) => {
  console.log("inside the register");

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  user
    .save()
    .then(() => {
      console.log("user registered successfully");

      return res.status(200).json({
        Status: true,
        msg: "user registered successfully",
      });
    })
    .catch((err) => {
      res.status(403).json({ msg: err });
    });
};

const loginUser = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result === null) {
      return res.status(403).json("Kullanıcı adı hatalı");
    }
    if (result.password === req.body.password) {
      // adding JWT token
      let token = jwt.sign({ username: req.body.username }, config.key, {
        expiresIn: "24h", // expires in 24 hours
      });
      res.status(200).json({
        token: token,
        msg: "successfully logged in",
        Status: true,
      });
    } else {
      return res.status(403).json("Parola hatalı");
    }
  });
};
module.exports = {
  getUser,
  deleteUser,
  updatePassword,
  registerUser,
  loginUser,
  getAllUsers,
  checkUserName,
  checkEmail,
};
