import mongoose from "mongoose";
const { Schema } = mongoose;

const AnswerSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
  difficulty: { type: String, default: "medium" },
  hint: String,
});

const Answer = mongoose.model("Answer", AnswerSchema);

export { AnswerSchema, Answer as default };
