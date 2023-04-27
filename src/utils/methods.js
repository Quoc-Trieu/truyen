export const getDaysInCurrentMonth = () => {
  const now = new Date();
  // return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return now;
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
};

export const findIdUserByPhone = ({ phone, arrayUser }) => {
  //tìm _id của user theo số điện thoại trong mảng arrayUser
  for (let i = 0; i < arrayUser?.length; i++) {
    if (arrayUser[i].idUserPartition === phone) {
      return arrayUser[i].infoUser._id;
    }
  }
  return null;
};

export const getInfoScaping = ({ infoScaping, dataScaping }) => {
  const result = [];

  for (let i = 0; i < dataScaping?.length; i++) {
    // khu cạo lớn A B C của dataScaping
    const area = dataScaping[i].infoScaping;

    // lấy ra các phần cạo trong khu cạo lớn A B C
    for (let j = 0; j < area?.length; j++) {

      // tên phần cạo
      const name = dataScaping[i].infoScaping[j].name;

      // tìm phần cạo trong infoScaping.lsScaping.scapingName
      let info = infoScaping.find((info) => info?.lsScaping[0]?.scapingName === name);

      // nếu không tìm thấy thì tạo mới info với tên phần cạo và các trường khác bằng 0
      if (!info) {
        info = {
          waterScaping: 0,
          cupScaping: 0,
          solidifiedScaping: 0,
          wireScaping: 0,
          total: 0,
          lsScaping: [{ scapingName: name }],
        };
      }

      // thêm vào mảng result
      result.push(info);
    }
  }

  return result;
};
