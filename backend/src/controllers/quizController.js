import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import UserQuiz from "../models/UserQuiz.js";

const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate({
      path: "sections",
      populate: {
        path: "questions",
      },
    });
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const submitQuiz = async (req, res) => {
  const userAnswers = req.body.userAnswers;
  const userId = req.body.userId;
  const quizId = req.body.quizId;

  let totalScore = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let totalQuestions = 0;

  const quizAnswers = await Promise.all(
    userAnswers.map(async (userAnswer) => {
      const question = await Question.findById(userAnswer.question);

      let isCorrect = false;
      if (userAnswer.selectedOption === question.correctAnswer) {
        correctAnswers++;
        totalScore += question.marks;
        isCorrect = true;
      } else if (
        userAnswer.selectedOption === "skipped" ||
        userAnswer.selectedOption !== question.correctAnswer
      ) {
        incorrectAnswers++;
        totalScore -= question.negativeMarks;
      }

      totalQuestions++;

      return {
        section: userAnswer.section,
        question: userAnswer.question,
        selectedOption: userAnswer.selectedOption,
        isCorrect,
      };
    })
  );

  const userQuiz = new UserQuiz({
    user: userId,
    quiz: quizId,
    answers: quizAnswers,
    totalScore,
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
  });

  await userQuiz.save();
  res.json({ message: "Quiz submitted successfully.", userQuiz });
};

const quizAnalysis = async (req, res) => {
  try {
    const userQuiz = await UserQuiz.findById(req.params.id)
      .populate({
        path: "quiz",
        model: "Quiz",
      })
      .populate({
        path: "answers.question",
        model: "Question",
      });

    res.json({ userQuiz });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { createQuiz, getQuizzes, getQuiz, submitQuiz, quizAnalysis };
