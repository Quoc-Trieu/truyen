import AxiosClient from "./axiosClient";

export const getALLUser = ({
  page,
  limit = 10,
  oderBy,
  query,
  userRole = "ADMIN",
  userStatus,
}) => {
  return AxiosClient.get("/user/getAllUsers", {
    params: { page: page ?? 1, limit, oderBy, query, userRole, userStatus },
  });
};

export const getInfo = (phone) => {
  return AxiosClient.get("/user/getInfo", { params: { phoneNumber: phone } });
};

export const putUpdateUser = (data) => {
  return AxiosClient.put("/user/updateUser", data, {
    params: { phone: data?.phone },
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
