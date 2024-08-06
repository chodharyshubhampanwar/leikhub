// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const GradeSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     enum: ["K-12", "UG", "PG"],
//     required: true,
//   },
//   tags: [
//     {
//       type: String,
//     },
//   ],
//   subjects: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Subject",
//     },
//   ],
//   level: {
//     type: String,
//     required: true,
//   },
//   year: {
//     type: String,
//     required: true,
//   },
// });

// export default mongoose.model("Grade", GradeSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const GradeSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["K-12", "UG", "PG"], required: true },
  tags: [String],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Correct reference
  level: { type: String, required: true },
  year: { type: String, required: true },
});

export default mongoose.model("Grade", GradeSchema);
