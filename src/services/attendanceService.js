import AxiosClient from './axiosClient';

export const getAttendanceInMonth = ({ date, query }) => {
  return AxiosClient.get('/attendance/getAttendanceInMonth', { params: { date: date, query: query } });
};

export const getInfoAreaScaping = () => {
  return AxiosClient.get('/area-scaping/getInfoAreaScaping');
};

export const postAttendance = ({
  idUser,
  isWork,
  isDelay,
  isPermission,
  note = '',
  date,
}) => {
  return AxiosClient.post('/attendance/createAttendance', {idUser, isWork, isDelay, isPermission, note, date});
};

export const postCreateQuantity = ({
  phoneUser,
  idUser,
  date,
  idScaping,
  latexWater,
  temp,
  latexCup,
  tempCup,
  latexSolidified,
  latexWire,
}) => {
  return AxiosClient.post('/quantity/createQuantity', { phoneUser, idUser, date, idScaping, latexWater, temp, latexCup, tempCup, latexSolidified, latexWire });
};

export const postAttendanceAllInOne = ({
  idUser,
  isWork,
  isDelay,
  isPermission,
  note,
  date,
  phoneUser,
  idScaping,
  latexWater = 0,
  temp = 10,
  latexCup = 0,
  tempCup = 40,
  latexSolidified = 0,
  latexWire = 0,
}) => {
  return AxiosClient.post('/attendance/allInOne', { idUser, isWork, isDelay, isPermission, note, date, phoneUser, idScaping, latexWater, temp, latexCup, tempCup, latexSolidified, latexWire });
};



