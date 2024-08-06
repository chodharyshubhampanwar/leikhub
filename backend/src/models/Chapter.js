import mongoose from "mongoose";
import { Schema } from "mongoose";

const ChapterSchema = new Schema({
  name: String,
  topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
});

export default mongoose.model("Chapter", ChapterSchema);
