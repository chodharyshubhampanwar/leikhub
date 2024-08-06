import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shu8hampanwar:RhjAeD8cj52qGkXQ@cluster0.f1nj60c.mongodb.net/",
      { serverSelectionTimeoutMS: 60000 }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
