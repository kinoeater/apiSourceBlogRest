const express = require("express");
const middlewareAuthCheck = require("../middlewareAuthCheck");
const {addProfile,uploadProfileImage,uploadsingleImage,updateProfile,checkProfile} = require("../controllers/profileController")


const router = express.Router(); 


router.post("/add",middlewareAuthCheck.checkToken,addProfile);
router.patch("/update",middlewareAuthCheck.checkToken,updateProfile);
router.patch("/add/image",middlewareAuthCheck.checkToken,uploadsingleImage,uploadProfileImage);
router.get("/checkprofile",middlewareAuthCheck.checkToken,checkProfile);


// router.route("/query users").get(middleware.checkToken,(req,res) => {
//     User.find({},(err,result)=>{
      
//         var userMap = {};

//     users.forEach(function(user) {
//       userMap[user._id] = user;
//     });

//     res.send(userMap);   
        
//     })
// })




module.exports = router;