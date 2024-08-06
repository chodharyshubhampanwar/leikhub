import mongoose from "mongoose";

import slugify from "slugify";

const { Schema } = mongoose;

const TestSchema = new mongoose.Schema({
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
  paper: {
    type: String,
  },
  answers: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TestSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Test = mongoose.model("Test", TestSchema);

export { TestSchema, Test as default };
