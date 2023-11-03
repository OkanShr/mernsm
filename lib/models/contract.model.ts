import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  dateStart: {
    type: String,
  },
  dateEnd: {
    type: String,
  },
  stages: 
    {
      "Stage1": Boolean,
      "Stage2": Boolean,
    },
  
  images: [
    {
       "Image1": String,
       "Image2": String
      },
    ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contract =
  mongoose.models.Contract || mongoose.model("Contract", contractSchema);

export default Contract;
