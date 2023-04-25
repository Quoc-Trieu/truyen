import AxiosClient from './axiosClient';

export const getQuantityByMonth = ({ date, query, isMonth }) => {
  return AxiosClient.get('/quantity/getQuantityByMonth', { params: { date, query, isMonth } });
};

export const getExcelQuantity = ({ date, query, isMonth }) => {
  return AxiosClient.get('/quantity/exportExcel', { params: { date, query, isMonth }, responseType: 'blob' });
};
