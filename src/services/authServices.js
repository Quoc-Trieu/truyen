import AxiosClient from "./axiosClient";

export const login = (data) => {
  console.log(data);
  return AxiosClient.post("auth/login", data);
};

export const getUser = () => {
  return AxiosClient.get("auth/info");
};

export const logoutUser = (data) => {
  return AxiosClient.post('auth/logout', data)
}
