const express = require("express");
const userOperations =require("./userOperations");
const profileOperations =require("./profileOperations");

const router = express.Router();

router.use("/user",userOperations);
router.use("/profile",profileOperations);

module.exports = router;