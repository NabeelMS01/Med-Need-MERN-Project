const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "Profiles",
  },
  profile_id: {
    type: ObjectId,
  },
  client_id: {
    type: ObjectId,
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
},
{ timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
