import mongoose from "mongoose";
const { Schema } = mongoose;

const QuizAnswerSchema = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOption: {
    type: Schema.Types.Mixed,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const UserQuizSchema = new Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answers: [QuizAnswerSchema],
  totalScore: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
});

const UserQuiz = mongoose.model("UserQuiz", UserQuizSchema);

export { UserQuizSchema, UserQuiz as default };
