import AxiosClient from "./axiosClient";


export const login = (data) => {
  return AxiosClient.post("auth/login", data);
};

export const getUser = () => {
  return AxiosClient.get("auth/info");
};

export const logoutUser = (data) => {
  return AxiosClient.post('auth/logout', data)
}
