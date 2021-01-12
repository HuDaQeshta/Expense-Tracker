const formatDate = (date) => {
  let d = new Date(date);
  let month = `${d.getMonth() + 1}`; //Because months starts from 0.
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear()}`;

  //Months and Days that doesn't have 2 digits, needs to add 0 to it as the second digit
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

export default formatDate;
