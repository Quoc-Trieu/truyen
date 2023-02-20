import AxiosClient from "./axiosClient";


export const getALLTreeByCondition = ({
  page,
  limit = 10,
  oderBy,
  query,
  typeTree,
  idLand,
  idRow,
  idTree,
}) => {
  console.log(page, limit, oderBy, query, typeTree, idLand, idRow, idTree);
  return AxiosClient.get("/tree/getTreeByCondition", {
    params: { page: page ?? 1, limit, oderBy, query, typeTree, idLand, idRow, idTree },
  });
};

export const putUpdateStatusTree = ({idTree, data}) => {
  return AxiosClient.put("/tree/updateStatusTree", data, {
    params: { treeID: idTree },
  });
};

export const getALLland = () => {
  return AxiosClient.get("/land/getAllLand");
};

export const getInfoLand = ({id, isName = true}) => {
  return AxiosClient.get("/land/getInfoLand", { params: { id: id, isName: isName } });
};


