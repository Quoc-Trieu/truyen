import AxiosClient from "./axiosClient";

export const getUserSalary = (time) => {
  return AxiosClient.get("/salary/getSalaryInMonth", {
    params: {
      date: time,
    },
  });
};

export const updateSetting = (data) => {
  return AxiosClient.put("/salary/updateSalaryMonth", data);
};

export const updateSalaryOther = (data) => {
  return AxiosClient.post("/salary/updateMoreSalary", data);
};

export const excelExport = (param) => {
  return AxiosClient.get("/salary/downloadExcel", {
    params: {
      date: param,
    },
    responseType: "blob"
  });
};
