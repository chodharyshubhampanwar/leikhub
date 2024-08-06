import mongoose from "mongoose";

const { Schema } = mongoose;

const QuestionStatusSchema = new Schema({
  questionId: String,
  status: String,
});

const SectionStatusSchema = new Schema({
  sectionId: String,
  questions: [QuestionStatusSchema],
});

const UserTestSchema = new Schema({
  userId: String,
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  startTime: Number,
  endTime: Number,
  questionStatuses: [SectionStatusSchema],
});

const UserTest = mongoose.model("UserTest", UserTestSchema);

export { UserTestSchema, UserTest as default };
