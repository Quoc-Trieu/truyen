import React, { useState, useEffect } from "react";
import styles from "./BodyAssignmentList.module.scss";
import iconAdd from "../../../../../../assets/ico/icon-ionic-add.png";
import ModalComponent from "../../../../../../components/ModalComponent/ModalComponent";
import ButtonDelete from "../../../../../../components/Button/ButtonDelete";
import QuantitySelect from "../../../../../../components/QuantitySelect/QuantitySelect";
import DropLandAssignment from "./DropDown/DropLandAssignment";
import DropTreeRowAssignment from "./DropDown/DropTreeRowAssignment";
import { useDispatch, useSelector } from "react-redux";
import { itemScapingSelector, setItemScaping, setListScaping } from "../../../../../../store/assignment/AssignmentSlice";
import { getALLTreeByCondition } from "./../../../../../../services/treeServices";
import LabelDropLand from './DropDown/LabelDropLand';
import LabelDropTreeRow from './DropDown/LabelDropTreeRow';

const BodyAssignmentList = () => {
  const dispatch = useDispatch();
  const [ land , setLand ] = useState([]);
  const itemScaping = useSelector(itemScapingSelector);
  //tạo mảng rỗng lưu trữ thông tin lô, hàng, cây bắt đầu, cây kết thúc
  const [listAssignment, setListAssignment] = useState([{ land: null, row: null, startTree: null, endTree: null }]);
  const [treeStart, setTreeStart] = useState(0);
  const [treeEnd, setTreeEnd] = useState();
  console.log(listAssignment);
    // dispatch(setListAssignment(listAssignment?.slice(0, -1)));

  useEffect(() => {
    const getTreeTotal = async () => {
      const res = await getALLTreeByCondition({ page: 1, limit: 5, idRow: itemScaping?.row });
      setTreeEnd(parseInt(res?.data?.total));
      setTreeStart(1);
      console.log("=====================" + res?.data?.total);
    };
    if (itemScaping?.row) {
      getTreeTotal();
    }
  }, [itemScaping]);


  const onAddItem = async () => {
    if(listAssignment.length === 1)
    {
      const newNumbers = [...listAssignment]; // sao chép mảng hiện tại
      newNumbers.splice(-1, 0, itemScaping); 
      setListAssignment([itemScaping, { land: null, row: null, startTree: null, endTree: null }]);
    }else {
      const newNumbers = [...listAssignment]; // sao chép mảng hiện tại
      newNumbers.splice(-1, 0, itemScaping); // thêm số vào trước phần tử cuối của mảng
      setListAssignment(newNumbers); // cập nhật mảng mới
      // reset giá trị của itemScaping
      dispatch(setItemScaping({ land: null, row: null, startTree: null, endTree: null }));
     
    }
    console.log("listAssignment: " ,listAssignment);

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
        {listAssignment  && listAssignment.map((item, index) => {
          if (listAssignment.length - index === 1) {
            return (
              <div key={index} className={styles.itemUI}>
                {/* <DropLandRow text="Lô số 1" />
                  <DropLandRow text="Hàng số 1" /> */}
                <DropLandAssignment />
                <DropTreeRowAssignment />
                <div className={styles.treeBegins}>
                  <span>Nhập cây bắt đầu</span>
                  <QuantitySelect
                    value={treeStart}
                    minValue={treeStart}
                    maxValue={treeEnd}
                    onChange={(quantity) => dispatch(setItemScaping({ startTree: quantity }))}
                  />
                </div>
                <div className={styles.treeBegins}>
                  <span>Nhập cây bắt đầu</span>
                  <QuantitySelect
                    value={treeEnd}
                    minValue={treeStart}
                    maxValue={treeEnd}
                    onChange={(quantity) => dispatch(setItemScaping({ endTree: quantity }))}
                  />
                </div>
                <div className={styles.btnDelete}>
                  <ButtonDelete text="Xóa" onDelete={() => console.log("Xóa")} />
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className={styles.itemUI}>
                {/* <DropLandRow text="Lô số 1" />
                  <DropLandRow text="Hàng số 1" /> */}
                <LabelDropLand label={item?.land} />
                <LabelDropTreeRow label={item?.row} />
                <div className={styles.treeBegins}>
                  <span>Nhập cây bắt đầu</span>
                  <QuantitySelect
                    value={item?.startTree}
                    onChange={() => console.log()}
                  />
                </div>
                <div className={styles.treeBegins}>
                  <span>Nhập cây bắt đầu</span>
                  <QuantitySelect
                    value={item?.endTree}
                    onChange={() => console.log()}
                  />
                </div>
                <div className={styles.btnDelete}>
                  <ButtonDelete text="Xóa" onDelete={() => console.log("Xóa")} />
                </div>
              </div>
            );

          }
        })}
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
