import AxiosClient from "./axiosClient";

const API_ENDPOINT = "/user";

export const getListUser = (params) => {
  return AxiosClient.get(API_ENDPOINT, { params: params });
};

export const changeSttUser = (id, data) => {
  return AxiosClient.put(API_ENDPOINT + `/status/${id}`, { "status": data });
};

export const createUserLocal = (data) => {
  return AxiosClient.post('user/create', {
    "phone": `${data.phone}`,
    "password": `${data.password}`
  });
}