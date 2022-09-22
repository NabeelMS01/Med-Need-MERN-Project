const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    is_professional: {
      type: Boolean,
       
    },
    is_employer: {
      type: Boolean,
      
    },
    current_location: {
      type: Object,
      default:null
     
    },

    status: {
      type: Boolean,
      default:true
      
    },
    approval_status: {
      type: Boolean,
      default:false
       
    },
      subscription_plan:{
        type:ObjectId,
        ref:"Plan",
        default:null
         
     },
  },
  { timestamps: true }
);

userSchema.pre('save',async function(next){
  this.status=true
  console.log(this.status,this.password);
  if(!this.isModified('password')){
      next()
  }
const salt =await bcrypt.genSalt(10);
this.password =await bcrypt.hash(this.password,salt)


})
userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

const User =mongoose.model('Users',userSchema)




module.exports = User;
