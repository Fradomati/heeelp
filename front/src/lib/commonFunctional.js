export const getByFilter = (arrayFilter, itemFilter) => {
  return arrayFilter.filter(item => {
    return item === itemFilter;
  });
};

export const getAverage = arrayFilter => {
  return Math.round(
    arrayFilter.reduce((itemA, itemB) => {
      return itemA + itemB;
    }) / arrayFilter.length
  );
};

export const getYearsOld = fecha => {
  let today = new Date();
  let myBirthday = new Date(fecha);
  let yearOld = today.getFullYear() - myBirthday.getFullYear();
  let m = today.getMonth() - myBirthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < myBirthday.getDate())) {
    yearOld--;
  }

  return yearOld;
};
