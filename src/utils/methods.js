export const getDaysInCurrentMonth = () => {
  const now = new Date();
  // return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return now
};

export const getCurrentDay = () => {
  const today = new Date();
  const date = today.getDate();
  return `${date}`;
};

export const getDayFromDateString = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
};

//trả về mảng các ngày trong tháng YYYY-MM-DD
export const getDaysInMonth = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const day = i < 10 ? `0${i}` : i;
    const dates = `${year}-${month < 10 ? `0${month}` : month}-${day}`;
    daysArray.push(dates);
  }

  return daysArray;
}

export const findIdUserByPhone = ({phone, arrayResult}) => {
  let result = null;
  arrayResult.forEach((subArray) => {
    const foundItem = subArray.find((item) => item.phoneUser === phone);
    if (foundItem) {
      result = foundItem.idUser;
    }
  });
  return result;
}