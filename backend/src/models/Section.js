import mongoose from "mongoose";

const { Schema } = mongoose;

const SectionSchema = new Schema({
  title: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

const Section = mongoose.model("Section", SectionSchema);

export { SectionSchema, Section as default };
