import AxiosClient from "./axiosClient";


export const getALLUser = ({ page, limit=10, oderBy, query, userRole='ADMIN', userStatus }) => {
  return AxiosClient.get('/user/getAllUsers', {params: { page: page ?? 1, limit, oderBy, query, userRole, userStatus,}});
};

export const getInfo = (phone) => {
  return AxiosClient.get('/user/getInfo', { params: { phoneNumber:  phone}});
};

export const putUpdateUser = (data) => {
  console.log({ params: { phone: data?.phone}, data});
  return AxiosClient.put('/user/updateUser', { params: { phone: data?.phone}, fullName: data?.fullName, phone: data?.phone, role: data?.role, status: data?.status});
};

export const postCreateUser = (data) => {
  return AxiosClient.post('/user/createUser', data);
};

