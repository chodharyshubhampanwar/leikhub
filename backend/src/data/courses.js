import Course from "../models/Course.js";

const getCourses = async (filter, options) => {
  try {
    const courses = await Course.find(filter, null, options).exec();
    const count = await Course.countDocuments(filter);
    return { courses, count };
  } catch (error) {
    throw new Error("Error fetching courses:", error);
  }
};

export { getCourses };
