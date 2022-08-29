const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/AdminModel");
const Professions = require("../models/professionModel");
const cloudinary = require("../utils/cloudinary");

const ObjectId = mongoose.Types.ObjectId;

const adminAuth = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email: email });

    if (user) {
      const accessToken = jwt.sign(
        { id: user._id, isSuperAdmin: user.isSuperAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2d",
        }
      );
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: email,
        isSuperAdmin: user.isSuperAdmin,
        status: user.status,
        token: accessToken,
      });
    }

    // createUser(email,password)

    async function createUser(email, password) {
      await Admin.create({
        email,
        password,
        isSuperAdmin: true,
        name: "nabeel",
        status: true,
      });
    }

    if (user.status) {
    }
  } catch (error) {
    console.log(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const user = await User.findOne({ _id: ObjectId(req.params.id) });
  if (user) {
    console.log(user);
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("no user found");
  }
});

const addProfession = asyncHandler(async (req, res) => {
  

  try {
    const { name, hiring_type } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    
    if (!result) {
      res.status(400);
      throw new Error("file upload failed");
    }
     await Professions.create({
      profession_name: name,
      hiring_type,
      cloudinary_url: result.url,
    }).then(async(response)=>{
      console.log(response);
      if (response) {
        res.status(200).json({ status: true, response });
      }
    })

    
  } catch (error) {
    console.log(error);
 if(error){
  res.status(400).json(error.response.message)
  
 }


  }
});

const getCategory =asyncHandler(async(req,res)=>{


try {
 
await Professions.find().then((response)=>{
   console.log(response);
   if(response){
    res.status(200).json(response)
   }else{
    res.status(400)
    throw new Error("No data")
   }
})

  
} catch (error) {
  if(error){
    res.status(400).json(error.response.message)
  }

}

})



module.exports = {
  adminAuth,
  getUser,
  addProfession,
  getCategory
};
