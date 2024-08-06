import Course from "../models/Course.js";
import Grade from "../models/Grade.js";
// import Subject from "../models/Subject.js";
// import Unit from "../models/Unit.js";
// import Chapter from "../models/Chapter.js";
// import Quiz from "../models/Quiz.js";
// import UserPath from "../models/Path.js";
//import Question from "../models/Question.js";

// const createCourse = async (req, res) => {
//   try {
//     const { board, courseName, subjects } = req.body;
//     const course = new Course({ board, courseName, subjects });
//     await course.save();
//     res.status(201).json({ message: "Course created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };

const createCourse = async (req, res) => {
  try {
    const { title, subject, category, grade, tags, units } = req.body;

    const course = new Course({
      title,
      subject,
      category,
      grade,
      tags,
      units,
    });

    await course.save();

    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating course" });
  }
};

export const createGrade = async (req, res) => {
  try {
    const newGrade = new Grade(req.body);
    const savedGrade = await newGrade.save();
    res.status(201).json(savedGrade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all grades
// export const getGrades = async (req, res) => {
//   try {
//     const level = req.query.level;
//     const filters = level ? { level } : {};

//     const grades = await Grade.find(filters);

//     res.json(grades);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Ensure correct path

export const getGrades = async (req, res) => {
  try {
    const { category, level, year } = req.query;
    const query = {
      ...(category && { category }),
      ...(level && { level }),
      ...(year && { year }),
    };

    const grades = await Grade.find(query)
      .populate({
        path: "courses",
        model: "Course",
      })
      .lean();

    const response = {
      grades: grades.map(
        ({ _id, title, category, tags, courses, level, year }) => ({
          _id,
          title,
          category,
          tags,
          courses,
          level,
          year,
        })
      ),
    };
    res.json(response);
  } catch (err) {
    console.error("Failed to fetch grades:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const createSubject = async (req, res) => {
//   try {
//     const { name, units } = req.body;
//     const subject = new Subject({ name, units });
//     await subject.save();
//     res.status(201).json({ message: "Subject created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };

// const createUnit = async (req, res) => {
//   try {
//     const { name, chapters } = req.body;
//     const unit = new Unit({ name, chapters });
//     await unit.save();
//     res.status(201).json({ message: "Unit created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };

// const createChapter = async (req, res) => {
//   try {
//     const { name, content, quiz } = req.body;
//     const chapter = new Chapter({ name, content, quiz });
//     await chapter.save();
//     res.status(201).json({ message: "Chapter created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };

// const createQuiz = async (req, res) => {
//   try {
//     const { name, questions } = req.body;
//     const quiz = new Quiz({ name, questions });
//     await quiz.save();
//     res.status(201).json({ message: "Quiz created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };

// export {
//   createCourse,
//   createSubject,
//   createUnit,
//   createChapter,
//   createQuiz,
//   createUserPath,
//   getCurrentCourse,
// };

// controllers.js

// const createCourse = async (req, res) => {
//   try {
//     const { name, board, subjects, units, chapters, quizzes } = req.body;

//     const course = new Course({
//       name,
//       board,
//       subjects,
//       units,
//       chapters,
//       quizzes,
//     });

//     await course.save();

//     res.status(201).json({ message: "Course created successfully", course });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };

// const createQuestion = async (req, res) => {
//   const { type, text, options, correctAnswer } = req.body;

//   try {
//     const question = new Question({
//       type,
//       text,
//       options,
//       correctAnswer,
//     });

//     await question.save();

//     res.status(201).json(question);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating question" });
//   }
// };

export { createCourse };
