import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import {
  register,
  getUser,
  addUserCourse,
  userChapters,
  getUserCourses,
} from "../controllers/authController.js";

router.post("/register", register);
router.get("/user/:id", getUser);
router.put("/user/:id/course", auth, addUserCourse);
router.get("/user/:userId/chapter/:chapterId/status", userChapters);
router.get("/user/:userId/courses", auth, getUserCourses);

export default router;
