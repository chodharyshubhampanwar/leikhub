import Question from "../models/Question.js";
import Test from "../models/Test.js";
import UserTest from "../models/UserTest.js";

const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).send(test);
  } catch (error) {
    res.status(400).send(error);
  }
};

const saveTest = async (req, res) => {
  const { userId, testId, startTime, endTime, questionStatuses } = req.body;

  try {
    const testResult = new UserTest({
      userId,
      testId,
      startTime,
      endTime,
      questionStatuses,
    });

    await testResult.save();

    res.status(201).json(testResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was a server error." });
  }
};

const tests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json({ tests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const test = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate({
      path: "sections",
      populate: {
        path: "questions",
      },
    });
    res.status(200).json({ test });
  } catch (error) {
    console.error(error);
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching the test",
    });
  }
};

const testAnalysis = async (req, res) => {
  console.log(req.params.id);

  try {
    const testResult = await UserTest.findById(req.params.id).populate({
      path: "testId",
      populate: {
        path: "sections",
        populate: {
          path: "questions",
        },
      },
    });
    res.status(200).json({ testResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching the test",
    });
  }
};

export { tests, createTest, saveTest, testAnalysis, test };
