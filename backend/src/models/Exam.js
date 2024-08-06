import mongoose from "mongoose";

import slugify from "slugify";

const { Schema } = mongoose;

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  category: {
    type: String,
  },
  topic: {
    type: String,
  },
  organization: {
    type: String,
  },
  duration: {
    type: String,
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

ExamSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Exam = mongoose.model("Exam", ExamSchema);

export { ExamSchema, Exam as default };
