import Exam from "../models/Exam.js";
import UserExam from "../models/UserExam.js";
import Section from "../models/Section.js";
import ExamAnalysis from "../models/ExamAnalysis.js";

const createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSection = async (req, res) => {
  try {
    const section = new Section({
      title: "Sample Section",
      questions: [],
    });

    await section.save();

    res.status(201).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the section",
    });
  }
};

const exams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching the tests",
    });
  }
};

const exam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate({
      path: "sections",
      populate: {
        path: "questions",
      },
    });
    res.status(200).json({ exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching the test",
    });
  }
};

const startExam = async (req, res) => {
  const answers = req.body.answers;
  try {
    let totalQuestions = answers.length;
    let attemptedQuestions = answers.filter((answer) => !answer.skipped).length;
    let timeTaken = req.body.endTime - req.body.startTime;

    const exam = await Exam.findById(req.body.examId).populate({
      path: "sections",
      populate: {
        path: "questions",
      },
    });

    const analysis = {
      totalQuestions,
      attemptedQuestions,
      timeTaken,
      sections: exam.sections.map((section) => {
        const sectionQuestions = answers.filter(
          (answer) => answer.sectionId.toString() === section._id.toString()
        );

        const questions = sectionQuestions.map((answer) => {
          const question = section.questions.find(
            (question) =>
              question._id.toString() === answer.questionId.toString()
          );

          const isCorrect =
            question && question.correctAnswer === answer.selectedOption;
          const isAttempted = !(answer.skipped || false);
          const score = isCorrect
            ? question.marks
            : isAttempted
            ? -question.negativeMarks
            : 0;

          return {
            question: answer.questionId,
            userAnswer: answer.selectedOption,
            correctAnswer: question.correctAnswer,
            isCorrect,
            score,
            skipped: !isAttempted,
            timeTaken: answer.timeTaken,
          };
        });

        const totalQuestions = questions.length;
        const attemptedQuestions = questions.filter(
          (question) => !question.skipped
        ).length;
        const correctAnswers = questions.filter(
          (question) => question.isCorrect
        ).length;
        const incorrectAnswers = attemptedQuestions - correctAnswers;
        const totalTimeTaken = questions.reduce(
          (total, question) => total + question.timeTaken,
          0
        );
        const totalScore = questions.reduce(
          (total, question) => total + question.score,
          0
        );
        const accuracy = attemptedQuestions
          ? (correctAnswers / attemptedQuestions) * 100
          : 0;

        const skippedQuestions = questions.filter(
          (question) => question.skipped
        ).length;

        return {
          section: section._id,
          name: section.title,
          questions,
          totalQuestions,
          attemptedQuestions,
          correctAnswers,
          incorrectAnswers,
          totalTimeTaken,
          totalScore,
          accuracy,
          skippedQuestions,
        };
      }),
    };

    const totalScore = analysis.sections.reduce(
      (total, section) => total + section.totalScore,
      0
    );
    const totalCorrectAnswers = analysis.sections.reduce(
      (total, section) => total + section.correctAnswers,
      0
    );
    const totalIncorrectAnswers = analysis.sections.reduce(
      (total, section) => total + section.incorrectAnswers,
      0
    );
    const totalSkippedQuestions = analysis.sections.reduce(
      (total, section) => total + section.skippedQuestions,
      0
    );
    analysis.score = totalScore;
    analysis.correctAnswers = totalCorrectAnswers;
    analysis.incorrectAnswers = totalIncorrectAnswers;
    analysis.skippedQuestions = totalSkippedQuestions;

    const userExam = new UserExam({
      ...req.body,
      analysis,
    });
    await userExam.save();

    res.json(userExam);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

const getExamAnalysis = async (req, res) => {
  try {
    const userExam = await UserExam.findById(req.params.id)
      .populate("analysis.sections")
      // .populate("analysis.sections.questions");
      .populate({
        path: "analysis.sections.questions.question",
        model: "Question",
      });
    if (!userExam) {
      return res.status(404).send("UserExam not found");
    }
    const userExams = await UserExam.find({ examId: userExam.examId });

    const attempts = userExams.length;

    const scores = userExams
      .filter((userExam) => userExam.analysis)
      .map((userExam) => userExam.analysis.score);
    scores.sort((a, b) => b - a);

    let rank = 1;
    let prevScore = null;
    const ranks = scores.map((score) => {
      if (score !== prevScore) {
        rank++;
      }
      prevScore = score;
      return rank;
    });

    const ranking = ranks[scores.indexOf(userExam.analysis.score)];

    const percentile = (1 - (ranking - 1) / attempts) * 100;

    const totalQuestions = userExam.analysis.totalQuestions;
    const correctAnswers = userExam.analysis.correctAnswers;
    const accuracy = totalQuestions
      ? (correctAnswers / totalQuestions) * 100
      : 0;

    userExam.analysis.percentile = percentile;
    userExam.analysis.ranking = ranking;
    userExam.analysis.accuracy = accuracy;
    userExam.analysis.attempts = attempts;

    await userExam.save();

    res.json(userExam);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export { createExam, exams, startExam, createSection, getExamAnalysis, exam };
