const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcryptjs')
const adminSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSuperAdmin: { type: Boolean ,default:false},
  status:{type:Boolean,
  required:true,
  default:true,
}
});

adminSchema.pre("save", async function (next) {
  console.log(this.email, this.password);
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
