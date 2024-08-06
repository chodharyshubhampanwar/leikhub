import mongoose from "mongoose";

import slugify from "slugify";

const { Schema } = mongoose;

const QuizSchema = new mongoose.Schema({
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
  topics: [
    {
      type: String,
    },
  ],
  duration: {
    type: Number,
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
  course: {
    type: String,
  },
  subject: {
    type: String,
  },
  unit: {
    type: String,
  },
  chapter: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

QuizSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export { QuizSchema, Quiz as default };
