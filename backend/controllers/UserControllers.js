const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Professions = require("../models/professionModel");
const cloudinary = require("../utils/cloudinary");
const Profile = require("../models/profileModel");
const ObjectId = mongoose.Types.ObjectId;
const verify = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return status(403).json("Token is invalid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};
//------------------------sign up -----------------------------------------------
const createAccount = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password, is_professional, is_employer } =
      req.body;

    const userExist = await User.findOne({ email });

    if (userExist != null) {
      res.status(400);
      throw new Error("email exist");
    }

    const user = await User.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
      is_professional: is_professional,
      is_employer: is_employer,

      approval_status: false,
      subscription_plan: null,
      location: null,
    })
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        if (err.keyPattern.phone == 1) {
          res.status(400);
          throw new Error("number exist");
        }
      });

    if (user) {
      res.status(200).json({
        _id: user._id,
      });
    }
  } catch (err) {
    if (res.statusCode == 400) {
      res.status(400).send(err.message);
    } else if (res.statusCode == 404 || res.statusCode == 500) {
      res.status(404).send("internal server error");
    }
  }
});
// ----------------Login----------------------------------
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist == null) {
      res.status(400);
      throw new Error("wrong email");
    }

    if (userExist && (await userExist.matchPassword(password))) {
      if (userExist.status) {
        const accessToken = jwt.sign(
          { id: userExist._id, isUser: true },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "2d",
          }
        );
        res.status(200).json({
          username: userExist.name,
          email: userExist.email,
          isUser: true,
          isProfessional: userExist.is_professional,
          accessToken,
        });
      } else {
        res.status(400);
        throw new Error("account blocked");
      }
    } else {
      res.status(400);
      throw new Error("wrong password");
    }
  } catch (error) {
    if (res.statusCode == 400) {
      res.status(400).send(error.message);
    } else if (res.statusCode == 404 || res.statusCode == 500) {
      res.status(404).send(" server error");
    }
  }
});
// ----------------------Get user data--------------------------------
const getallusers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.json(users);
    }
  } catch (error) {}
});

const getAllProfessions = asyncHandler(async (req, res) => {
  try {
    await Professions.find().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
});

// -------------------------------------Block or unblock uers------------------------------
const BlockUnblock = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    await User.findOne({ _id: ObjectId(_id) }).then((data) => {
      if (data) {
        if (data.status) {
          blockUser(_id);
        } else {
          unblockUser(_id);
        }
      }

      async function blockUser(id) {
        await User.updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              status: false,
            },
          }
        ).then((response) => {
          if (response) {
            res.status(200).json({ blockUnblock: true });
          }
        });
      }
      async function unblockUser(id) {
        await User.updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              status: true,
            },
          }
        ).then((response) => {
          if (response) {
            res.status(200).json({ blockUnblock: true });
          }
        });
      }
    });
  } catch (error) {}
});

const submitApplication = asyncHandler(async (req, res) => {
  try {
    let profileUrl;
    let resumeUrl;

    const {
      name,
      email,
      date_of_birth,
      gender,
      address,
      country,
      mobile,
      profession,
      about,
      languages,
      token,
    } = req.body;

    const { id } = jwt.decode(token);
    req.body.user_id = ObjectId(id);

    const { profile_img, resume } = req.files;

    if (!profile_img) {
      res.status(400);
      throw new Error("profile pending");
    }
    if (!resume) {
      res.status(400);
      throw new Error("resume pending");
    }

    if (profile_img && resume) {
      profileUrl = await cloudinary.uploader.upload(profile_img[0].path);
      resumeUrl = await cloudinary.uploader.upload(resume[0].path);

      req.body.profile_img = {
        url: profileUrl.url,
        public_id: profileUrl.public_id,
      };
      req.body.resume = {
        url: resumeUrl.url,
        public_id: resumeUrl.public_id,
      };

      await Profile.create(req.body).then((response) => {
        res.status(200).json(response);
      });
    }
  } catch (error) {
    if (error) {
      if (error.message) {
        res.status(400).json(error.message);
      }
    }
  }
});

const checkFormstatus = asyncHandler(async (req, res) => {
  try {
    const { username, email, isProfessional, accessToken } = req.body;
    const tokenData = jwt.decode(accessToken);

    if (isProfessional) {
      await Profile.findOne({ user_id: ObjectId(tokenData.id) }).then(
        (response) => {
          if (!response) {
            res.status(200).json({ status: false });
          } else {
            res.status(200).json({ status: true });
          }
        }
      );
    }
  } catch (error) {
    if (error) {
      res.status(400);
    }
  }
});

const ProfileData = asyncHandler(async (req, res) => {
  try {
    console.log("response");
    const token = req.params.id;
    const { id } = jwt.decode(token);

    await User.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "user_id",
          as: "profile",
        },
      },
      {
        $unwind: {
          path: "$profile",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
      .allowDiskUse(true)
      .then((response) => {
        console.log(response[0]);

        if (response) {
          res.status(200).json(response[0]);
        }
      });
  } catch (error) {
    console.log(error);
  }
});

const updateResume = asyncHandler(async (req, res) => {
  try {
    const { public_id, profile_id } = req.body;

    console.log(public_id);
    console.log(profile_id);

    console.log(req.files.resume[0]);

    const deleteFile = await cloudinary.v2.uploader.destroy(req.body.public_id);
    let resumeUrl;
    if (deleteFile) {
      resumeUrl = await cloudinary.uploader.upload(req.files.resume[0].path);
    }
    console.log(resumeUrl);
    if (resumeUrl && deleteFile) {
      await Profile.updateOne(
        { _id: ObjectId(profile_id) },
        {
          $set: {
            resume: { url: resumeUrl.url, public_id: resumeUrl.public_id },
          },
        }
      ).then((response) => {
        console.log(response); 

   if(response){
    res.status(200).json(response)
   }


      });
    }
  } catch (error) {
    res.status(400).json(error)
  }
});


const UpdateProfile =asyncHandler(async(req,res)=>{

  console.log("req.body");
  

try {
 console.log(req.body);


} catch (error) {
  console.log(error);
}



})

module.exports = {
  createAccount,
  authUser,
  verify,
  getallusers,
  BlockUnblock,
  getAllProfessions,
  submitApplication,
  checkFormstatus,
  ProfileData,
  updateResume,
  UpdateProfile
};
