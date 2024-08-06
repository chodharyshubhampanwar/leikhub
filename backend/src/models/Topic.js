import mongoose from "mongoose";
import { Schema } from "mongoose";

const TopicSchema = new Schema({
  name: String,
  content: String,
});

export default mongoose.model("Topic", TopicSchema);
