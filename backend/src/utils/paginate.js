const pagination = (page, limit) => {
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageSize = limit ? parseInt(limit, 10) : 10;
  const skip = (currentPage - 1) * pageSize;
  return { skip, limit: pageSize };
};

export default pagination;
