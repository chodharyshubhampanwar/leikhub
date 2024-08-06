import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import {
  getLesson,
  getCoursesList,
  getCourse,
} from "../controllers/courseController.js";

import {
  createCourse,
  createGrade,
  getGrades,
} from "../controllers/contentController.js";

import {
  // submitTest,
  // submitAnswer,
  saveTest,
  testAnalysis,
  createTest,
  tests,
  test,
} from "../controllers/testController.js";

import {
  createExam,
  exams,
  exam,
  startExam,
  createSection,
  getExamAnalysis,
} from "../controllers/examController.js";

import {
  createQuiz,
  getQuiz,
  getQuizzes,
  submitQuiz,
  quizAnalysis,
} from "../controllers/quizController.js";

router.get("/courses", getCoursesList);
router.get("/course/:id", getCourse);
router.get("/lesson/:id", getLesson);
router.post("/createquiz", createQuiz);
router.post("/submitquiz", auth, submitQuiz);
router.post("/submitTest", saveTest);
// router.post("/submitAnswer", auth, submitAnswer);
router.get("/questions");
router.get("/test/:id", test);
router.get("/quizzes", getQuizzes);
router.get("/quiz/:id", getQuiz);
router.get("/tests", tests);
router.get("/exams", exams);
router.get("/testanalysis/:id", testAnalysis);
router.get("/quizanalysis/:id", quizAnalysis);

router.post("/exams", createExam);
router.get("/exam/:id", exam);
router.post("/exams/new", startExam);
router.post("/exams/section", createSection);
router.get("/exam/:id/analysis", getExamAnalysis);
router.post("/createTest", createTest);

router.post("/createCourse", createCourse);
router.post("/grade", createGrade);
router.get("/grades", getGrades);
// router.post("/courses", createCourse);

// router.get("/courses", getCourses);
// router.get("/courses/:id", getCourse);
// router.get("/courses/:courseId/subjects", getSubjects);
// router.get("/courses/:courseId/subjects/:id", getSubject);
// router.get("/courses/:courseId/subjects/:subjectId/units/:id", getUnit);
// router.get( "/chapters/:id",  getChapter );
// router.get( "/topics/:id",getTopic );
// router.get(  "quizzes", getQuizzes );
// router.get(  "/quizzes/:id", getQuiz);
// router.post("/submitQuiz", submitQuiz);
// router.post("/submitQuestion", createQuestion);
// router.post("/courses", createCourse);

export default router;
