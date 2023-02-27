import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./BodyAssignmentList.module.scss";
import iconAdd from "../../../../../../assets/ico/icon-ionic-add.png";
import ModalComponent from "../../../../../../components/ModalComponent/ModalComponent";
import ButtonDelete from "../../../../../../components/Button/ButtonDelete";
import QuantitySelect from "../../../../../../components/QuantitySelect/QuantitySelect";
import DropLandAssignment from "./DropDown/DropLandAssignment";
import DropTreeRowAssignment from "./DropDown/DropTreeRowAssignment";
import { useDispatch, useSelector } from "react-redux";
import { setCatchError, setListScaping } from "../../../../../../store/assignment/AssignmentSlice";
import { getALLland, getALLTreeByCondition, getInfoLand, getRowByLand } from "./../../../../../../services/treeServices";
import Notiflix from "notiflix";
import { Loading } from "notiflix";
import { listScapingSelector, catchErrorSelector } from "./../../../../../../store/assignment/AssignmentSlice";

const BodyAssignmentList = () => {
  const dispatch = useDispatch();
  const listScaping = useSelector(listScapingSelector);
  const catchError = useSelector(catchErrorSelector);

  const [landALL, setLandALL] = useState();

  const [listSpacing, setListSpacing] = useState([]);
  const [infoScaping, setInfoScaping] = useState([{ land: null, row: null, startTree: null, endTree: null, firstTree: null, lastTree: null }]);

  useEffect(() => {
    //lấy tất cả lo và truyền vào component cho user chọn lô
    const getLand = async () => {
      const res = await getALLland();
      setLandALL(res.data);
      updateInfoScaping(infoScaping.length - 1, { land: res?.data });
      console.log(updateInfoScaping(0, { land: res?.data }));
    };
    getLand();
  }, []);

  useEffect(() => {
    // cập nhập danh sách vùng cạo vào store
    dispatch(setListScaping(listSpacing));
    console.log("listScaping===========: ", JSON.stringify(listScaping));
    console.table(listScaping);
  }, [listSpacing]);

  const updateInfoScaping = (index, updatedInfo) => {
    // update lại để render ra danh sách lựa chọn vùng cạo
    setInfoScaping((prevInfo) => {
      const newState = [...prevInfo];
      newState[index] = { ...newState[index], ...updatedInfo };
      return newState;
    });
  };

  const updateListScaping = (index, value) => {
    // update lại danh sách đã chọn vùng cạo của người dùng
    setListSpacing((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], ...value };
      return newState;
    });
  };

  //khi nhấn chọn lô
  const onSelectLand = (keyValue, item) => {
    const idLand = item?._id;
    const nameLand = item?.name;

    updateListScaping(keyValue, { land: nameLand }); //lưu lô người dùng chọn vào state
    //truyền namLand và lấy số hàng có trong lô từ Server
    if (idLand) {
      try {
        const getRow = async () => {
          const res = await getRowByLand(idLand);
          console.log("res: ", res?.data);
          updateInfoScaping(keyValue, { row: res?.data });
        };
        getRow();
      } catch (err) {
        console.log(err);
        Notiflix.Notify.failure("Lấy hàng thất bại từ server");
      }
    } else {
      Notiflix.Notify.failure("Chọn lô thất bại");
    }
    dispatch(setCatchError({ landError: "" }));
  };

  //bỏ chọn lô
  const onUnSelectLand = (keyValue) => {
    updateListScaping(keyValue, { land: null, row: null, startTree: 0, endTree: 0 });
    updateInfoScaping(keyValue, { row: null, firstTree: null, lastTree: null });
  };

  //khi nhấn chọn hàng
  const onSelectRow = (keyValue, item) => {
    const nameRow = item?.name;
    try {
      const getAllTree = async () => {
        const res = await getALLTreeByCondition({ page: 1, limit: 2, idRow: nameRow });
        updateListScaping(keyValue, { row: nameRow, startTree: 1, endTree: parseInt(res?.data?.total) });
        updateInfoScaping(keyValue, { firstTree: 1, lastTree: parseInt(res?.data?.total) });
      };
      getAllTree();
    } catch (error) {
      Notiflix.Notify.failure("Lấy cây từ hàng thất bại");
      console.log(error);
    }
    dispatch(setCatchError({ rowError: "" }));
  };

  //onchange khi chọn cây
  const onChangeTreeStart = (keyValue, value) => {
    updateListScaping(keyValue, { startTree: value });
  };

  const onChangeTreeEnd = (keyValue, value) => {
    updateListScaping(keyValue, { endTree: value });
  };

  //khi nhấn chọn "thêm mới" vùng cạo
  const onAddItem = async () => {
    console.log("listSpacing: ", listSpacing);
    if (
      //kiểm tra các giá trị trong object của phần tử cuối có rỗng không
      listSpacing[listSpacing.length - 1]?.land === null ||
      listSpacing[listSpacing.length - 1]?.land === undefined ||
      listSpacing[listSpacing.length - 1]?.row === null ||
      listSpacing[listSpacing.length - 1]?.row === undefined ||
      listSpacing[listSpacing.length - 1]?.startTree === null ||
      listSpacing[listSpacing.length - 1]?.endTree === null
    ) {
      if (listSpacing[listSpacing.length - 1]?.land === null || listSpacing[listSpacing.length - 1]?.land === undefined) {
        dispatch(setCatchError({ landError: "Vui lòng chọn lô" }));
      }
      if (listSpacing[listSpacing.length - 1]?.row === null || listSpacing[listSpacing.length - 1]?.row === undefined) {
        dispatch(setCatchError({ rowError: "Chưa nhập hàng cạo" }));
      }
    } else {
      setListSpacing([...listSpacing, { land: null, row: null, startTree: null, endTree: null }]);
      setInfoScaping([...infoScaping, { land: landALL, row: null, firstTree: null, lastTree: null }]);
    }
  };

  //khi nhấn chọn "xóa" vùng cạo
  const onDeleteItem = (index) => {
    if (index != 0) {
      Loading.pulse("Đang xóa...");
      const newList = [...listSpacing]; // sao chép mảng hiện tại
      const newListInfo = [...infoScaping]; // sao chép mảng hiện tại
      // xóa phần tử tương ướng với index
      newList.splice(index, 1);
      newListInfo.splice(index, 1);
      setListSpacing(newList); // cập nhật mảng mới
      setInfoScaping(newListInfo); // cập nhật mảng mới
      Loading.remove();
    }
  };

  return (
    <div className={styles.bodyAssignmentList}>
      <div className={styles.headerRow}>
        <span>Lô</span>
        <span>Hàng</span>
        <span>Cây bắt đầu</span>
        <span>Cây kết thúc</span>
        <span></span>
      </div>

      {/* Item row */}
      <div className={styles.ListContainer}>
        {infoScaping &&
          infoScaping !== null &&
          infoScaping.map((item, index) => {
            const lastItem = index == infoScaping?.length - 1 ? true : false;
            return (
              <div key={index} className={styles.itemUI}>
                {/* chọn lô */}
                <DropLandAssignment
                  keyValue={index}
                  landALL={item?.land}
                  onSelectLand={onSelectLand}
                  label={listSpacing[index]?.land}
                  onUnSelectLand={onUnSelectLand}
                  lastItem={lastItem}
                />
                <span className={styles.line}></span>
                {/* chọn hàng */}
                <DropTreeRowAssignment
                  keyValue={index}
                  NumRowOfLand={item?.row}
                  onSelectRow={onSelectRow}
                  label={listSpacing[index]?.row}
                  styleCustom={{ pointerEvents: listSpacing[index]?.land == null ? "none" : "auto" }}
                />
                <span className={styles.line}></span>
                {/* cây bắt đầu */}
                <div className={styles.treeBegins} style={{ pointerEvents: listSpacing[index]?.row == null ? "none" : "auto" }}>
                  <span>Nhập cây bắt đầu</span>
                  <QuantitySelect
                    keyValue={index}
                    value={listSpacing[index]?.startTree}
                    minValue={item?.firstTree}
                    maxValue={item?.lastTree}
                    onChange={onChangeTreeStart}
                  />
                </div>
                <span className={styles.line}></span>
                {/* cây kết thúc */}
                <div className={styles.treeBegins} style={{ pointerEvents: listSpacing[index]?.row == null ? "none" : "auto" }}>
                  <span>Nhập cây kết thúc</span>
                  <QuantitySelect
                    keyValue={index}
                    value={listSpacing[index]?.endTree}
                    minValue={item?.firstTree}
                    maxValue={item?.lastTree}
                    onChange={onChangeTreeEnd}
                  />
                </div>
                <div className={styles.btnDelete} style={{ pointerEvents: "auto" }}>
                  <ButtonDelete text="Xóa" onDelete={() => onDeleteItem(index)} />
                </div>
              </div>
            );
          })}
        {/* hiển thị lỗi  */}
        {catchError?.landError || catchError?.rowError ? (
          <div className={styles.errorItem}>
            <span>{catchError?.landError}</span>
            <span>{catchError?.rowError}</span>
          </div>
        ) : null}

        {/* Thêm mới */}
        <div className={styles.btnAddAssignment} onClick={onAddItem}>
          <img className={styles.iconAdd} src={iconAdd} />
          <span>Thêm mới</span>
        </div>
      </div>
    </div>
  );
};

export default BodyAssignmentList;
