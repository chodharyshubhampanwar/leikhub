import Course from "../models/Course.js";

const getCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "units",
        populate: { path: "chapters" },
      })
      .exec();

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while fetching the course with units and chapters",
      error,
    });
  }
};

export { getCourse };
