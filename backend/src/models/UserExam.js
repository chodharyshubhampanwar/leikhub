import mongoose from "mongoose";
const { Schema } = mongoose;

const SectionAnalysisSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: "Section" },
  name: String,
  questions: [
    {
      question: { type: Schema.Types.ObjectId, ref: "Question" },
      userAnswer: { type: String },
      skipped: { type: Boolean },
      timeTaken: Number,
      score: Number,
    },
  ],
  totalQuestions: Number,
  attemptedQuestions: Number,
  skippedQuestions: Number,
  correctAnswers: Number,
  incorrectAnswers: Number,
  totalTimeTaken: Number,
  accuracy: Number,
  totalScore: Number,
});

const ExamAnalysisSchema = new Schema({
  user: { type: String, ref: "User" },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  sections: [SectionAnalysisSchema],
  score: { type: Number },
  totalQuestions: Number,
  attemptedQuestions: Number,
  correctAnswers: Number,
  incorrectAnswers: Number,
  skippedQuestions: Number,
  timeTaken: Number,
  percentile: Number,
  ranking: Number,
  accuracy: Number,
  attempts: Number,
});

ExamAnalysisSchema.index({ exam: 1 });

const UserExamSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  examId: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  analysis: ExamAnalysisSchema,
});

const UserExam = mongoose.model("UserExam", UserExamSchema);

export { UserExamSchema, UserExam as default };
