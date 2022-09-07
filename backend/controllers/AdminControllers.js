const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/AdminModel");
const Professions = require("../models/professionModel");
const cloudinary = require("../utils/cloudinary");
const Profile = require("../models/profileModel");

const ObjectId = mongoose.Types.ObjectId;

const adminAuth = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email: email });

    if (!user) {
      res.status(404).json("wrong email");
    }

    if (user) {
      if (!user.status) {
        res.status(400).json("account blocked");
      }
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
    } else {
      res.status(404).json("No user found");
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
  } catch (error) {
    console.log(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: ObjectId(req.params.id) });
  if (user) {
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
    }).then(async (response) => {
      if (response) {
        res.status(200).json({ status: true, response });
      }
    });
  } catch (error) {
    if (error) {
      res.status(400).json(error.response.message);
    }
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    await Professions.find().then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400);
        throw new Error("No data");
      }
    });
  } catch (error) {
    if (error) {
      res.status(400).json(error.response.message);
    }
  }
});

const userProfiles = asyncHandler(async (req, res) => {
  try {
    await Profile.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userdata",
        },
      },
      {
        $unwind: {
          path: "$userdata",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
      },
    ]).then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(null);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const acceptProfile = asyncHandler(async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ _id: ObjectId(req.params.id) });
   
    console.log(userProfile.user_id);
    console.log(req.params.status);

    if (req.params.status == "verified") {
     await   User.updateOne(
        { _id: ObjectId(userProfile.user_id) },
        {
          $set: {
            approval_status: true,
          },
        }
      ).then((response)=>{
        if(response){  res.status(200).json(response) }
        
        console.log(response);} );
    } else if (req.params.status == "declined") {
      User.updateOne(
        { _id: userProfile.user_id },
        {
          $set: {
            approval_status: false,
          },
        }
      ).then((response)=>{console.log(response);
        if(response){  res.status(200).json(response) }
    
       
      });
    }

    await Profile.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: { approval_status: req.params.status },
      }
    );
  } catch (error) {
    console.log(error) 
  }
});
module.exports = {
  adminAuth,
  getUser,
  addProfession,
  getCategory,
  userProfiles,
  acceptProfile,
};
