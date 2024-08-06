import mongoose from "mongoose";
const { Schema } = mongoose;

const SectionAnalysisSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: "Section" },
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
  score: { type: Number },
  totalQuestions: Number,
  attemptedQuestions: Number,
  correctAnswers: Number,
  incorrectAnswers: Number,
  skippedQuestions: Number,
  percentile: Number,
  ranking: Number,
  timeTaken: Number,
  averageTimePerQuestion: Number,
  sections: [SectionAnalysisSchema],
  total: Number,
});

ExamAnalysisSchema.index({ exam: 1 });

const ExamAnalysis = mongoose.model("ExamAnalysis", ExamAnalysisSchema);

export { ExamAnalysisSchema, ExamAnalysis as default };
