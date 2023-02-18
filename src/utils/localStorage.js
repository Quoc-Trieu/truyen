const LOCAL_STORAGE_AUTH_KEY = "LOCAL_STORAGE_AUTH_KEY";
const LOCAL_STORAGE_PHONE = "LOCAL_STORAGE_PHONE";

export const setToken = (token) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};
export const getToken = () => {
  const jwtToken = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  return jwtToken || null;
};
export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};


export const setPhoneLocalStorage = (token) => {
  localStorage.setItem(LOCAL_STORAGE_PHONE, token);
};
export const getPhoneLocalStorage = () => {
  const phone = localStorage.getItem(LOCAL_STORAGE_PHONE);
  return phone || null;
};
export const removePhoneLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_PHONE);
};