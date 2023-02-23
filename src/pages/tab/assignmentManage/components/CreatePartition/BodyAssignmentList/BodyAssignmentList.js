import React, { useState, useEffect } from "react";
import styles from "./BodyAssignmentList.module.scss";
import iconAdd from "../../../../../../assets/ico/icon-ionic-add.png";
import ModalComponent from "../../../../../../components/ModalComponent/ModalComponent";
import ButtonDelete from "../../../../../../components/Button/ButtonDelete";
import QuantitySelect from "../../../../../../components/QuantitySelect/QuantitySelect";
import DropLandAssignment from "./DropDown/DropLandAssignment";
import DropTreeRowAssignment from "./DropDown/DropTreeRowAssignment";
import { useDispatch, useSelector } from "react-redux";
import { setListScaping } from "../../../../../../store/assignment/AssignmentSlice";
import { getALLland, getALLTreeByCondition, getInfoLand } from "./../../../../../../services/treeServices";
import Notiflix from "notiflix";
import { listScapingSelector, catchErrorSelector } from "./../../../../../../store/assignment/AssignmentSlice";

const BodyAssignmentList = () => {
  const dispatch = useDispatch();
  const listScaping = useSelector(listScapingSelector);
  const catchError = useSelector(catchErrorSelector);

  const [landALL, setLandALL] = useState();
  const [rowOfLand, setRowOfLand] = useState();

  const [saveSelectorItem, setSaveSelectorItem] = useState([{ land: null, row: null, startTree: null, endTree: null, firstTree: null, lastTree: null }]);

  useEffect(() => {
    dispatch(setListScaping(saveSelectorItem));
    console.log("listScaping=============: ", JSON.stringify(listScaping));
  }, [saveSelectorItem]);

  useEffect(() => {
    //lấy tất cả lo và truyền vào component cho user chọn lô
    const getLand = async () => {
      const res = await getALLland();
      setLandALL(res.data);
      console.log(res.data);
    };
    getLand();
  }, []);

  const setUpdateSaveSelector = (value) => {
    let newState = [...saveSelectorItem];
    Object.keys(value).map((key) => {
      newState[newState.length - 1] = {
        ...newState[newState.length - 1],
        [key]: value[key],
      };
    });
    setSaveSelectorItem(newState);
  };

  const onSelectLand = (value) => {
    const namLand = value?.name;
    setUpdateSaveSelector({ land: namLand }); //lưu vào state

    //truyền namLand và lấy số hàng có trong lô từ Server
    if (namLand) {
      try {
        const getRow = async () => {
          const res = await getInfoLand({ id: namLand });
          setRowOfLand(res.data[0]?.rowsFromLand);
        };
        getRow();
      } catch (err) {
        console.log(err);
        Notiflix.Notify.failure("Lấy hàng thất bại từ server");
      }
    } else {
      Notiflix.Notify.failure("Chọn lô thất bại");
    }
  };

  const onUnSelectLand = () => {
    setUpdateSaveSelector({ land: null, row: null, startTree: null, endTree: null, firstTree: null, lastTree: null });
  };

  const onSelectRow = (value) => {
    const nameRow = value?.name;
    try {
      const getAllTree = async () => {
        const res = await getALLTreeByCondition({ page: 1, limit: 2, idRow: nameRow });
        setUpdateSaveSelector({ row: nameRow, startTree: 1, endTree: parseInt(res?.data?.total), firstTree: 1, lastTree: parseInt(res?.data?.total)});
      };
      getAllTree();
    } catch (error) {
      Notiflix.Notify.failure("Lấy cây từ hàng thất bại");
      console.log(error);
    }
  };

  const onChangeTreeStart = (value) => {
    setUpdateSaveSelector({ startTree: value });
  };

  const onChangeTreeEnd = (value) => {
    setUpdateSaveSelector({ endTree: value });
  };

  const onAddItem = async () => {
    if (
      //kiểm tra các giá trị trong object của phần tử cuối có rỗng không
      saveSelectorItem[saveSelectorItem.length - 1].land === null ||
      saveSelectorItem[saveSelectorItem.length - 1].row === null ||
      saveSelectorItem[saveSelectorItem.length - 1].startTree === null ||
      saveSelectorItem[saveSelectorItem.length - 1].endTree === null
    ) {
      Notiflix.Notify.failure("Vui lòng nhập đầy đủ thông tin");
    } else {
      setSaveSelectorItem([...saveSelectorItem, { land: null, row: null, startTree: null, endTree: null, firstTree: null, lastTree: null  }]);
      setRowOfLand(null);
    }
  };

  const onDeleteItem = (index) => {
    // const newNumbers = [...listAssignment]; // sao chép mảng hiện tại
    // newNumbers.splice(index, 1); // thêm số vào trước phần tử cuối của mảng
    // setListAssignment(newNumbers); // cập nhật mảng mới
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
        {saveSelectorItem &&
          saveSelectorItem.map((item, index) => {
            const lastItem = index == saveSelectorItem.length - 1 ? true : false;
            return (
                <div key={index} className={styles.itemUI}  style={{pointerEvents: lastItem ? 'auto' : 'none'}}>
                  {/* <DropLandRow text="Lô số 1" />
                    <DropLandRow text="Hàng số 1" /> */}
                  <DropLandAssignment landALL={landALL} onSelectLand={onSelectLand} label={item?.land} onUnSelectLand={onUnSelectLand}/>
                  <span className={styles.line}></span>
                  <DropTreeRowAssignment NumRowOfLand={rowOfLand} onSelectRow={onSelectRow} label={item?.row} />
                  <span className={styles.line}></span>
                  <div className={styles.treeBegins}>
                    <span>Nhập cây bắt đầu</span>
                    <QuantitySelect value={item?.startTree} minValue={item?.firstTree} maxValue={item?.lastTree} onChange={onChangeTreeStart} />
                  </div>
                  <span className={styles.line}></span>
                  <div className={styles.treeBegins}>
                    <span>Nhập cây bắt đầu</span>
                    <QuantitySelect value={item?.endTree} minValue={item?.firstTree} maxValue={item?.lastTree} onChange={onChangeTreeEnd} />
                  </div>
                  <div className={styles.btnDelete}>
                    <ButtonDelete text="Xóa" onDelete={() => console.log("Xóa")} />
                  </div>
                </div>
            );
          })}
          <div className={styles.errorItem}>
            <span >{catchError?.landError}</span>
            <span >{catchError?.rowError}</span>
          </div>
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
