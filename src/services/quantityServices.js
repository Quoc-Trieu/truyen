import AxiosClient from "./axiosClient";

export const getQuantityByMonth = ({
    date ,
    query,
    isMonth,
  }) => {
    return AxiosClient.get('/quantity/getQuantityByMonth', {params: {date, query, isMonth}});
  };

