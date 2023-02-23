import React, { useState, useEffect } from "react";
import styles from "./FooterAssignment.module.scss";
import ButtonSimple from "./../../../../../../components/Button/ButtonSimple";
import {
  idUserPartitionSelector,
  listScapingSelector,
  namePartitionSelector,
  setCatchError,
  resetSpacing,
  setListScaping,
} from "./../../../../../../store/assignment/AssignmentSlice";
import { useSelector, useDispatch } from "react-redux";
import { postCreateScaping, putLocationScaping, deleteScaping, getScapingByName } from "./../../../../../../services/assignmentServices";
import Notiflix from "notiflix";
import { Loading } from "notiflix";

const FooterAssignment = ({ onCancel }) => {
  const dispatch = useDispatch();
  const listScaping = useSelector(listScapingSelector);
  const idUserPartition = useSelector(idUserPartitionSelector);
  const namePartition = useSelector(namePartitionSelector);

  const onSummit = () => {
    console.log("listAssignment: ", listScaping);
    if (!checkError()) {
      postCreatePartition(listScaping);
    } else {
      Notiflix.Notify.warning("Vui lòng kiểm tra lại thông tin");
    }
  };

  // tạo vùng cạo
  const postCreatePartition = async (listScaping) => {
    const dataTreePolyline = convertMap(listScaping);
    Loading.standard("Đang thêm vùng cạo");
    let idScaping = "";
    try {
      //tạo ra vùng cạo, lấy id vùng cạo để thêm cây vào vùng cạo
      const resCreateScaping = await postCreateScaping({ idUserPartition: idUserPartition, name: namePartition });
      idScaping = resCreateScaping.data?._id; //res.data?._id;
      console.log("create  idScaping: ", idScaping);
      /////////////////////
      try {
        //Api thêm cây vào vùng cạo
        const resAddTree = await putLocationScaping({ idScaping: idScaping, data: dataTreePolyline });
        console.log("result putLocationScaping: ", resAddTree);
        onCancel && onCancel();
        Notiflix.Notify.success("Tạo vùng cạo thành công");
      } catch (error) {
        if (error?.response?.data?.code == "TREE_IS_EXIST_IN_SCAPING") {
          Notiflix.Notify.failure("Cây nằm trong vùng cạo khác");
        } else {
          Notiflix.Notify.failure("Tạo vùng cao thất bại");
        }
        //khi tạo vùng cạo thành công nhưng thêm cây thất bại thì xóa vùng cạo
        const getIdScaping = await getScapingByName(namePartition);
        const resDelete = await deleteScaping(getIdScaping?.data?._id);
      }
      ////////////////
    } catch (error) {
      if (error?.response?.data?.code == "SCAPING_EXIST") {
        Notiflix.Notify.failure("Vùng cạo đã tồn tại");
      } else {
        Notiflix.Notify.failure("Tạo vùng cạo thất bại");
      }
    }

    Loading.remove();
    postCreatePartition();
  };

  const convertMap = (listScaping) => {
    let line1 = [];
    let line2 = [];
    let line3 = [];
    let line4 = [];

    const firstRow = listScaping[0]?.row;
    const startTreeFirstRow = listScaping[0]?.startTree;
    const endTreeFirstRow = listScaping[0]?.endTree;

    const lastRow = listScaping[listScaping.length - 1]?.row;
    const startTreeLastRow = listScaping[listScaping.length - 1]?.startTree;
    const endTreeLastRow = listScaping[listScaping.length - 1]?.endTree;

    const lengthItem = listScaping.length;

    // line 1: tất cả các cây của hàng đàu tiên (đầu => cuối)
    for (let i = startTreeFirstRow; i <= endTreeFirstRow; i++) {
      const tree = paddedString(i, 3);
      line1.push(firstRow + tree);
    }
    // line 2 các cây cuối của các hàng (đầu => cuối)
    for (let i = 0; i < lengthItem; i++) {
      const tree = paddedString(listScaping[i]?.endTree, 3);
      line2.push(listScaping[i]?.row + tree);
    }
    // line 3 tất cả các cây của hàng cuối cùng (cuối => đầu)
    for (let i = endTreeLastRow; i >= startTreeLastRow; i--) {
      const tree = paddedString(i, 3);
      line3.push(lastRow + tree);
    }
    // line 4 tất cả các cây đầu của các hàng (cuối => đầu)
    for (let i = lengthItem; i > 0; i--) {
      const tree = paddedString(listScaping[i - 1]?.startTree, 3);
      line4.push(listScaping[i - 1]?.row + tree);
    }
    const dataTreePolyline = line1.concat(line2, line3, line4);
    return dataTreePolyline;
  };

  const checkError = () => {
    let isError = false;
    if (idUserPartition == null || idUserPartition == "") {
      dispatch(setCatchError({ idUserPartitionError: "Vui lòng chọn người thực hiện" }));
      isError = true;
    } else {
      dispatch(setCatchError({ idUserPartitionError: "" }));
    }
    if (namePartition == null || namePartition == "") {
      dispatch(setCatchError({ namePartitionError: "Vui lòng nhập tên vùng cạo" }));
      isError = true;
    } else {
      dispatch(setCatchError({ namePartitionError: "" }));
    }
    if (listScaping[listScaping.length - 1]?.land == null) {
      dispatch(setCatchError({ landError: "Vui lòng chọn lô" }));
      isError = true;
    } else {
      dispatch(setCatchError({ landError: "" }));
    }
    if (listScaping[listScaping.length - 1]?.row == null) {
      dispatch(setCatchError({ rowError: "Chưa nhập hàng cạo" }));
      isError = true;
    } else {
      dispatch(setCatchError({ rowError: "" }));
    }
    return isError;
  };

  const paddedString = (number, length) => {
    // hàm này để convert số thành chuỗi có độ dài length(lấy số convert sang id Cây)
    let strNum = String(number);
    let numZeros = length - strNum.length;
    return "C" + "0".repeat(numZeros) + strNum;
  };

  return (
    <div className={styles.footerAssignment}>
      <ButtonSimple bold text="Hủy" onSummit={onCancel} />
      <ButtonSimple bold text="Xác nhận" styleCustom={{ background: "linear-gradient(90deg, #6AB100 0%, #85E000 100%)" }} onSummit={onSummit} />
    </div>
  );
};

export default FooterAssignment;
