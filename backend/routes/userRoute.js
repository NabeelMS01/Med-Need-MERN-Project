const express = require("express");

const router = express.Router();
const cloudinary =require('../utils/cloudinary')
const upload=require('../utils/multer')

const { createAccount, authUser,verify,getallusers,BlockUnblock } = require("../controllers/UserControllers");
const {adminAuth,getUser,addProfession,getCategory}=require('../controllers/AdminControllers')
//=================user router==============================
router.get("/get-all-users", getallusers);
router.post("/create-account", createAccount);
router.post("/login", authUser);
router.post("/block-user",  BlockUnblock);
router.post("/unblock-user",  BlockUnblock);








//=====================admin router =======================

router.post("/admin-login",adminAuth)
router.get("/user/:id",getUser)

router.post("/admin/add-profession",upload.single('image'),addProfession)
router.get("/admin/get-all-professions",getCategory)
module.exports = router;
