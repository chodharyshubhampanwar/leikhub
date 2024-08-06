import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  type: {
    type: String,
    enum: [
      "true_false",
      "multiple_choice",
      "fill_in_the_blank",
      "match_the_following",
    ],
    required: true,
  },
  text: { type: String, required: true },
  options: { type: [String], default: undefined },
  correctAnswer: { type: Schema.Types.Mixed, required: true },
  explanation: String,
  marks: { type: Number, required: true },
  negativeMarks: { type: Number, default: 0 },
});

const Question = mongoose.model("Question", QuestionSchema);

export { QuestionSchema, Question as default };
