export const getCategoryOptions = (groupedList) => {
  const uniqueCategories = [
    ...new Set(groupedList.map((group) => group.category)),
  ];

  const options = uniqueCategories.map((category) => ({
    id: category,
    label: category,
  }));

  return options;
};

export const filterCategories = (groupedList, categoryId) => {
  if (!categoryId) {
    return groupedList;
  }
  const filteredCategories = groupedList.filter((cat) => categoryId === cat.category);
  return filteredCategories;
};
