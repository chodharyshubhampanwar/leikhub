import mongoose from "mongoose";
import { Schema } from "mongoose";

const CourseSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true }, // e.g., "Math"
  category: { type: String, required: true }, // e.g., "K-12"
  grade: { type: String, required: true }, // e.g., 12
  tags: [String], // Additional tags as needed e.g., ["Advanced", "Semester 2", "Elective"]
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
});

export default mongoose.model("Course", CourseSchema);
