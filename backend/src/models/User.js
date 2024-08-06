import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  username: String,
  firebaseId: { type: String, index: true },
  activeCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  completedChapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  completedQuizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  completedUnits: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
  completedTests: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  completedExams: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
});

export default mongoose.model("User", UserSchema);
