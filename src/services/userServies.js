import AxiosClient from "./axiosClient";

export const getALLUser = ({
  page,
  limit = 10,
  oderBy,
  query,
  userRole,
  userStatus,
}) => {
  return AxiosClient.get("/user/getAllUsers", {
    params: { page: page ?? 1, limit, oderBy, query: query, userRole: userRole, userStatus },
  });
};

export const getInfo = (phone) => {
  return AxiosClient.get("/user/getInfo", { params: { phoneNumber: phone } });
};

export const putUpdateUser = ({phone, data}) => {
  return AxiosClient.put("/user/updateUser", data, {
    params: { phone: phone },
  });
};

export const postCreateUser = (data) => {
  return AxiosClient.post("/user/createUser", data);
};

export const deleteUser = (phone) => {
  const data = {
    phoneNumber: phone,
  }
  return AxiosClient.delete("user/deleteUser", {data});
};

export const putChangePass = ({phone, data}) => {
  console.log({phone, data});
  return AxiosClient.put("/user/updatePassUser", data, {
    params: { phone: phone },
  });
};

export const getPassNoHas = (phone) => {
  return AxiosClient.get("/user/getPassNoHas", {params: { phone: phone }});
};

