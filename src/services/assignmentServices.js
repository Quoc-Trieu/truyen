import AxiosClient from "./axiosClient";


export const getPassNoHas = (phone) => {
  return AxiosClient.get("/user/getPassNoHas", {params: { phone: phone }});
};

export const postCreateScaping = (data) => {
  return AxiosClient.post("/scaping/createScaping", 
  {
    name: data?.name,
    status: "UNSHAVED",
    idUserPartition: data?.idUserPartition,
    location: []
  });
};

export const putLocationScaping = ({idScaping , data}) => {
  return AxiosClient.put("/scaping/setLocationScaping", {lsNameTree: data}, {params: { idScaping : idScaping }});
};

