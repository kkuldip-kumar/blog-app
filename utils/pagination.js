function generatePaginationData(
  page,
  totalPages,
  skip,
  itemsPerPage,
  totalDocs,
  docs
) {
  const pagination = {
    page,
    first_page_url: `/?page=1`,
    from: skip + 1,
    last_page: totalPages,
    links: [],
    next_page_url: page < totalPages ? `/?page=${page + 1}` : null,
    items_per_page: itemsPerPage,
    prev_page_url: page > 1 ? `/?page=${page - 1}` : null,
    to: skip + docs.length,
    totalDocs,
  };

  for (let i = 1; i <= totalPages; i++) {
    pagination.links.push({
      url: i === page ? null : `/?page=${i}`,
      label: i.toString(),
      active: i === page,
      page: i,
    });
  }

  return pagination;
}

export default generatePaginationData;
