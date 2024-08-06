import User from "../models/User.js";
import Course from "../models/Course.js";

const register = async (req, res) => {
  try {
    const {
      email,
      activeCourses,
      firebaseId,
      token,
      completedQuizzes,
      completedChapters,
      completedUnits,
    } = req.body;

    if (req.user && req.user.userId !== firebaseId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const username = email.substring(0, email.lastIndexOf("@"));

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({
      email,
      username,
      firebaseId,
      activeCourses,
      completedQuizzes,
      completedChapters,
      completedUnits,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ firebaseId: id }).populate({
      path: "activeCourses",
      populate: {
        path: "subjects",
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

const addUserCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const { courses } = req.body;
    const user = await User.findOne({ firebaseId: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const courseIds = courses;

    const validCourses = await Course.find({ _id: { $in: courseIds } });
    if (!validCourses) {
      return res.status(404).json({ error: "Course not found" });
    }

    const newEnrollments = courseIds.filter(
      (courseId) => !user.activeCourses.includes(courseId)
    );
    const alreadyEnrolled = newEnrollments.some((courseId) =>
      user.activeCourses.includes(courseId)
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        error: "User already enrolled in one or more of the courses",
      });
    }

    user.activeCourses = [...new Set([...courseIds])];
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding courses to user" });
  }
};

const userChapters = async (req, res) => {
  try {
    const { userId, chapterId } = req.params;
    const user = await User.findOne({ firebaseId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isChapterCompleted = user.completedChapters.includes(chapterId);
    res.json({ completed: isChapterCompleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching chapter status" });
  }
};

const getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "activeCourses",
      populate: {
        path: "subjects",
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user.activeCourses);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user's courses" });
  }
};

export { register, getUser, addUserCourse, userChapters, getUserCourses };
