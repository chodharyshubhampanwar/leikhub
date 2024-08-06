// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const SectionAnalysisSchema = new Schema({
//   section: { type: Schema.Types.ObjectId, ref: "Section" },
//   questions: [
//     {
//       question: { type: Schema.Types.ObjectId, ref: "Question" },
//       skipped: { type: Boolean },
//       timeTaken: Number,
//     },
//   ],
//   totalQuestions: Number,
//   attemptedQuestions: Number,
//   skippedQuestions: Number,
//   totalTimeTaken: Number,
// });

// const TestAnalysisSchema = new Schema({
//   user: { type: String, ref: "User" },
//   test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
//   totalQuestions: Number,
//   attemptedQuestions: Number,
//   skippedQuestions: Number,
//   timeTaken: Number,
//   sections: [SectionAnalysisSchema],
//   total: Number,
// });

// TestAnalysisSchema.index({ test: 1 });

// const TestAnalysis = mongoose.model("TestAnalysis", TestAnalysisSchema);

// export { TestAnalysisSchema, TestAnalysis as default };
