import mongoose from "mongoose";
import { Schema } from "mongoose";

const SubjectSchema = new Schema({
  name: String,
  units: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
});

export default mongoose.model("Subject", SubjectSchema);
