const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
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



const createAccount = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password, is_professional, is_employer } =
      req.body;

    const userExist = await User.findOne({ email });

    if (userExist != null) {
      res.status(400);
      throw new Error("email exist");
    }
    console.log(name);
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
        console.log(data);
        if (data) {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        console.log(err.keyPattern.phone == 1);
        if (err.keyPattern.phone == 1) {
          res.status(400);
          throw new Error("number exist");
        }
      });

    console.log("user");
    if (user) {
      res.status(200).json({
        _id: user._id,
      });
    }
  } catch (err) {
    console.log(err.message);

    if (res.statusCode == 400) {
      res.status(400).send(err.message);
    } else if (res.statusCode == 404 || res.statusCode == 500) {
      res.status(404).send("internal server error");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist == null) {
      res.status(400);
      throw new Error("wrong email");
    }

    if (userExist && (await userExist.matchPassword(password))) {
      console.log("logged in");
      console.log(userExist);
      //  res.status(200).json({status:true})
      //Generate jwt token
      const accessToken = jwt.sign(
        { id: userExist._id, isUser: true },
        process.env.ACCESS_TOKEN_SECRET,{
          expiresIn:"15m"
        }
      );
      res.status(200).json({
        username: userExist.name,
        email: userExist.email,
        isUser: true,
        accessToken,
      });
    } else {
      console.log("wrong password");
      res.status(400);
      throw new Error("wrong password");
    }
  } catch (error) {
    console.log(error.message);
    if (res.statusCode == 400) {
      res.status(400).send(error.message);
    } else if (res.statusCode == 404 || res.statusCode == 500) {
      res.status(404).send(" server error");
    }
  }
});

const getallusers=asyncHandler(async(req,res)=>{
  try {
   const users= await User.find()
 if(users){
  res.sendStatus(200).json(users)
 }

  } catch (error) {
    
  }
})

module.exports = {
  createAccount,
  authUser,
  verify,
  getallusers
};
