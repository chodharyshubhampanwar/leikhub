const buildFilter = (query) => {
  const filter = {};
  const { category, level, grade, subject, tags } = query;

  if (category) filter.category = category;
  if (level) filter.level = level;
  if (grade) filter.grade = grade;
  if (subject) filter.subjects = subject;
  if (tags) filter.tags = { $in: tags.split(",") };

  return filter;
};

export default buildFilter;
