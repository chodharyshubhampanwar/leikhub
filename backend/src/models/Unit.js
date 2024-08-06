import mongoose from "mongoose";
import { Schema } from "mongoose";

const UnitSchema = new Schema({
  name: String,
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

export default mongoose.model("Unit", UnitSchema);
