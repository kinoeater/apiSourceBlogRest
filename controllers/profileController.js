const express = require("express");
const Profile = require("../models/profile.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.decoded.username + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  // fileFilter: fileFilter,
});

const uploadsingleImage = upload.single("img");

const uploadProfileImage = async (req, res) => {
  Profile.findOneAndUpdate(
    { username: req.decoded.username },
    {
      $set: {
        img: req.file.path,
      },
    },
    { new: true },
    (err, profile) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "image added successfully updated",
        data: profile,
      };
      return res.status(200).send(response);
    }
  );
};



const addProfile = (req, res, next) => {
  const profile = Profile({
    username: req.decoded.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    profession: req.body.profession,
    DOB: req.body.DOB,
    titleline: req.body.titleline,
    city: req.body.city,
    about: req.body.about,
  });

  profile
    .save()
    .then(() => {
      console.log("Profile saved successfully");

      return res.status(200).json({
        Status: true,
        msg: "Profile registered successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};




const checkProfile = (req, res, next) => {
  Profile.findOne({ username: req.decoded.username }, (err, result) => {

    console.log(req.decoded.username);
    
    if (err) res.status(500).json({ msg: err });

    if (result !== null) {
      return res.json({
        Status: true,
        msg: "Profil bilgisi var",
      });
    } else if (result === null) {
      return res.json({
        Status: false,
        msg: "Profil bilgisi yok",
      });
    }
  });
};

const updateProfile = (req, res, next) => {
  Profile.findOneAndUpdate(
    { username: req.params.username },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profession: req.body.profession,
        DOB: req.body.DOB,
        titleline: req.body.titleline,
        city: req.body.city,
        about: req.body.about,
      },
    },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err });

      return res.status(200).json({
        msg: "profile updated successfully",
        username: req.params.username,
        Status: true,
      });
    }
  );
};

module.exports = {
  addProfile,
  uploadProfileImage,
  uploadsingleImage,
  updateProfile,
  checkProfile,
};
