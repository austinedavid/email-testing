import mongoose from "mongoose";

const courses = new mongoose.Schema(
  {
    title: String,
    price: Number,
    banner: String,
    previewVideo: String,
    mainVideo: String,
    subject: String,
    teacherId: mongoose.Types.ObjectId,
    byAdmin: Boolean,
    sellCount: {
      type: Number,
      default: 0,
    },
    details: String,
    grade: String,
    buyersList: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courses);
export default courseModel;
