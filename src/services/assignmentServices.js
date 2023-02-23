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

export const getInfoAllScaping = ({page =1, limit=10, oderBy, query}) => {
  return AxiosClient.get("/scaping/getInfoAllScaping" , {params : { page: page, limit: limit, oderBy: oderBy, query: query }});
};

export const deleteTreeInScaping = (idScaping) => {
  return AxiosClient.delete("/scaping/deleteTreeInScaping" , {params : { idScaping : idScaping }} );
};

export const postCheckTreeInScaping = (data) => {
  console.log(data);
  return AxiosClient.post("/scaping/checkTreeInScaping" , data );
};

export const deleteScaping = (idScaping) => {
  return AxiosClient.delete("/scaping/deleteScaping" , {params: {idScaping: idScaping }} );
};

export const getScapingByName = (nameScaping) => {
  return AxiosClient.get("/scaping/getScapingByName" , {params: {nameScaping: nameScaping  }} );
};


