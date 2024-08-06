import Course from "../models/Course.js";
import Chapter from "../models/Chapter.js";
import Topic from "../models/Topic.js";
import Unit from "../models/Unit.js";
import createError from "http-errors"; // npm
import pagination from "../utils/paginate.js";
import { getCourses } from "../data/courses.js";
import buildFilter from "../utils/filter.js";

const getCoursesList = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { skip, limit: pageSize } = pagination(page, limit);
    const filter = buildFilter(req.query);

    const { courses, count } = await getCourses(filter, {
      skip,
      limit: pageSize,
    });

    res.json({
      courses,
      totalPages: Math.ceil(count / pageSize),
      currentPage: +page || 1,
      pageSize,
    });
  } catch (err) {
    next(err);
  }
};

const getCourse = async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(createError(400, "Invalid course ID format"));
  }

  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "units",
        populate: { path: "chapters", model: "Chapter" },
      })
      .exec();

    if (!course) {
      return next(createError(404, "Course not found"));
    }

    res.json({ course });
  } catch (error) {
    console.error(
      `getCourseDetails - Error fetching course with ID: ${courseId}`,
      error
    );
    next(createError(500, "Server error while fetching course details"));
  }
};

const getLesson = async (req, res, next) => {
  const chapterId = req.params.id;
  if (!chapterId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(createError(400, "Invalid chapter ID format"));
  }

  try {
    const lesson = await Chapter.findById(chapterId).populate("topics").exec();

    if (!lesson) {
      return next(createError(404, "Chapter not found"));
    }

    res.json({ lesson });
  } catch (error) {
    console.error(
      `getChapterDetails - Error fetching chapter with ID: ${chapterId}`,
      error
    );
    next(createError(500, "Server error while fetching chapter details"));
  }
};

export { getLesson, getCourse, getCoursesList };
