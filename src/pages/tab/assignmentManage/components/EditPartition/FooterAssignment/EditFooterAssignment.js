import React, { useState, useEffect } from "react";
import styles from "./EditFooterAssignment.module.scss";
import ButtonSimple from "./../../../../../../components/Button/ButtonSimple";
import iconEdit from "./../../../../../../assets/ico/icon-feather-edit.png";
import {
  idUserPartitionSelector,
  listScapingSelector,
  namePartitionSelector,
  setCatchError,
  resetSpacing,
  setListScaping,
  idScapingEditSelector,
  isEditSelector,
  setIsEdit,
} from "./../../../../../../store/assignment/AssignmentSlice";
import { useSelector, useDispatch } from "react-redux";
import { postCreateScaping, putLocationScaping, deleteScaping, getScapingByName, postCheckTreeInScaping } from "./../../../../../../services/assignmentServices";
import Notiflix from "notiflix";
import { Loading } from "notiflix";

const EditFooterAssignment = ({ onCancel, data }) => {
  const dispatch = useDispatch();
  const listScaping = useSelector(listScapingSelector);
  const idUserPartition = useSelector(idUserPartitionSelector);
  const namePartition = useSelector(namePartitionSelector);
  const idScapingScaping = useSelector(idScapingEditSelector);
  const idEdit = useSelector(isEditSelector);

  const onSummit = () => {
    console.log("listAssignment: ", listScaping);
    console.log("idScapingScaping: ", idScapingScaping);
    console.log("namePartition: ", namePartition);
    const listTree = convertArrTree(listScaping);
    const checkTree = async () => {
      const res = await postCheckTreeInScaping(listTree);
      console.log("res: ", res);

    }
    checkTree()
    console.log("listTree: ", listTree);
    if (!checkErrorEditDetail()) {
      CreatePartition(listScaping);
    } else {
      Notiflix.Notify.warning("Vui lòng kiểm tra lại thông tin");
    }
  };

  // tạo vùng cạo
  const CreatePartition = async (listScaping) => {
    const dataTreePolyline = convertMap(listScaping);
    Loading.standard("Đang thêm vùng cạo");
    let idScaping = "";
    try {
      //Xóa vùng cạo cũ trước khi cập nhập lại
      const resDelete = await deleteScaping(idScapingScaping);
      //tạo ra vùng cạo, lấy id vùng cạo để thêm cây vào vùng cạo
      const resCreateScaping = await postCreateScaping({ idUserPartition: idUserPartition, name: namePartition });
      idScaping = resCreateScaping.data?._id; //id vùng cạo
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
  };

  // convert ra mảng tất cả các cây từ danh sách vùng cạo người dùng chọn
  const convertArrTree = (listScaping) => {
    let listTree = [];
    for (let i = 0; i < listScaping.length; i++) {
      const startTree = listScaping[i]?.startTree;
      const endTree = listScaping[i]?.endTree;
      const row = listScaping[i]?.row;
      for (let j = startTree; j <= endTree; j++) {
        const tree = paddedString(j, 3);
        listTree.push(row + tree);
      }
    }
    return listTree;
  }

// tạo ra 4 line để vẽ các cây trên bản đồ
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

  const checkErrorEditDetail = () => {
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


  
  const NumLandRowTree = (detail) => {
    let lo = detail?.length;
    let hang=0;
    let cay=0;

    if (detail?.length > 0) {
      detail.map((itemLo, index) => {
        // console.log(item?.hang.length);
        hang += itemLo?.hang.length;

        itemLo?.hang.map((itemHang, index) => {
          // console.log(item?.cay.length);
          const arrTree = itemHang?.cay;
          const startTree = parseInt(arrTree[0].slice(arrTree[0].length-3, arrTree[0].length));
          const endTree = parseInt(arrTree[arrTree.length -1].slice(arrTree[arrTree.length -1].length-3, arrTree[arrTree.length -1].length));
          cay += (endTree - startTree) + 1;
        })
      })
    }
    return { lo, hang, cay };
  }

  return (
    <div className={styles.footerAssignment}>
      <div className={styles.footerAssignment__left}>
        <div className={styles.footerAssignment__left__item}>
          <span className={styles.footerAssignment__left__item__title}>Số lô cạo:</span>
          <span className={styles.footerAssignment__left__item__content}>{NumLandRowTree(data?.detail).lo} lô</span>
        </div>
        <div className={styles.footerAssignment__left__item}>
          <span className={styles.footerAssignment__left__item__title}>Số hàng cạo:</span>
          <span className={styles.footerAssignment__left__item__content}>{NumLandRowTree(data?.detail).hang} hàng</span>
        </div>
        <div className={styles.footerAssignment__left__item}>
          <span className={styles.footerAssignment__left__item__title}>Tổng cây cạo:</span>
          <span className={styles.footerAssignment__left__item__content}>{NumLandRowTree(data?.detail).cay} cây</span>
        </div>
      </div>

      {idEdit ? (
        <div className={styles.footerAssignment__right}>
          <ButtonSimple bold text="Hủy" width="170px" onSummit={onCancel} />
          <ButtonSimple
            bold
            text="Xác nhận"
            width="170px"
            onSummit={onSummit}
            styleCustom={{ background: "linear-gradient(90deg, #6379f8 0%, #6379f8 100%)" }}
          />
        </div>
      ) : (
        <div className={styles.footerAssignment__right}>
          <ButtonSimple
            bold
            text="Chỉnh sửa"
            icon={iconEdit}
            onSummit={() => dispatch(setIsEdit(true))}
            styleCustom={{ background: "linear-gradient(90deg, #00A2FF 0%, #00A2FF 100%)" }}
          />
        </div>
      )}
    </div>
  );
};

export default EditFooterAssignment;
