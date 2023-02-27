import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./EditBodyAssignmentList.module.scss";
import iconAdd from "../../../../../../assets/ico/icon-ionic-add.png";
import ModalComponent from "../../../../../../components/ModalComponent/ModalComponent";
import ButtonDelete from "../../../../../../components/Button/ButtonDelete";
import QuantitySelect from "../../../../../../components/QuantitySelect/QuantitySelect";
import EditDropLandAssignment from "./DropDown/EditDropLandAssignment";
import EditDropTreeRowAssignment from "./DropDown/EditDropTreeRowAssignment";
import { useDispatch, useSelector } from "react-redux";
import { isEditSelector, setCatchError, setListScaping, setListScapingFocusEdit } from "../../../../../../store/assignment/AssignmentSlice";
import { getALLland, getALLTreeByCondition, getInfoLand, getRowByLand } from "./../../../../../../services/treeServices";
import Notiflix from "notiflix";
import { Loading } from "notiflix";
import { listScapingSelector, catchErrorSelector } from "./../../../../../../store/assignment/AssignmentSlice";

const EditBodyAssignmentList = ({ data }) => {
  const dispatch = useDispatch();
  const listScaping = useSelector(listScapingSelector);
  const catchError = useSelector(catchErrorSelector);
  const isEdit = useSelector(isEditSelector);

  const [landALL, setLandALL] = useState();

  const [listSpacing, setListSpacing] = useState([]);
  const [infoScaping, setInfoScaping] = useState([]);

  useEffect(() => {
    console.log("=============================================");
    const dataScaping = data?.detail; //sao chép lại mảng detail của data vùng cạo
    console.log("Array dataScaping: ", dataScaping);
    let newListScaping = []; // tạo mảng rỗng để chứa dữ liệu sau khi chuyển đổi
    dataScaping.forEach((itemLo, index) => {
      console.log(itemLo?.hang.length); //log có bao nhiêu hàng trong lô
      // lấy ra các hàng
      itemLo.hang.forEach((itemHang, index) => {
        console.log(itemHang?.cay.length); //log có bao nhieu cây trong hàng
        //lấy đầu bắt đầu và cây kết thúc của hàng, lấy ra 3 ký tự cuối và chuyển sang dạng số
        const arrTree = itemHang.cay;
        const startTree = parseInt(arrTree[0].slice(arrTree[0].length - 3, arrTree[0].length));
        const endTree = parseInt(arrTree[arrTree.length - 1].slice(arrTree[arrTree.length - 1].length - 3, arrTree[arrTree.length - 1].length));
        console.log("endTree", endTree);
        // thêm từng hàng vào mảng theo định dạng để tạo thành bảng
        updateListScaping(index, { land: itemLo.lo, row: itemHang.hang, startTree: startTree, endTree: endTree });
        newListScaping.push({ land: itemLo.lo, row: itemHang.hang, startTree: startTree, endTree: endTree });
        console.log("Chuyển từ dữ liệu Server của vùng cạo sang dạng bảng", newListScaping);
      });
    });
     //lưu lại mảng trước khi chỉnh sửa
     dispatch(setListScapingFocusEdit(newListScaping));

   
    //tạo dữ liệu để chỉnh sửa --infoScaping
    const dataEdit = data?.detail; //sao chép lại mảng detail của data vùng cạo
    try {
      dataEdit.forEach((itemLo, index) => {
        const getInfo = async () => {
          const namLo = itemLo.lo;

          let landALL = [];
          try {
            // lấy tất cả các lô gán vào biến landALL để người dùng chọn
            const res = await getALLland();
            landALL = res.data;
          } catch (err) {
            console.log(err);
          }

          let rowInfo = [];
          const idLo = findIdByName(namLo, landALL); //tìm id của lô theo tên lô
          try {
            // từ id lô lấy ra thông tin các hàng
            const res = await getRowByLand(idLo);
            console.log("res: ", res?.data);
            rowInfo = res?.data;
          } catch (err) {
            console.log(err);
          }
          // for each hàng lấy ra thông tin cây đầu và cây cuối
          itemLo.hang.forEach((itemHang, index) => {
            const nameRow = itemHang.hang;
            try {
              // dựa vào tên hàng để tìm get thông tin cây đầu và cây cuối
              const getAllTree = async () => {
                const res = await getALLTreeByCondition({ page: 1, limit: 2, idRow: nameRow });
                updateInfoScaping(index, { land: landALL, row: rowInfo, firstTree: 1, lastTree: parseInt(res?.data?.total) });
                console.log(index, { land: landALL, row: rowInfo, firstTree: 1, lastTree: parseInt(res?.data?.total) });
              };
              getAllTree();
            } catch (error) {
              console.log(error);
            }
          });
        };
        getInfo();
      });
    } catch (err) {
      console.log(err);
    }
    console.log("=============================================");
  }, []);

  //tìm id của lô theo tên lô
  const findIdByName = (name, array) => {
    // Lặp qua từng phần tử trong mảng đối tượng JSON
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      // Nếu tên của phần tử hiện tại bằng với tên được tìm kiếm, trả về _id của phần tử đó
      if (array[i].name === name) {
        return array[i]._id;
      }
    }
    // Nếu không tìm thấy phần tử nào có tên bằng với tên được tìm kiếm, trả về null
    return null;
  };

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
    console.table(listScaping);
  }, [listSpacing]);

  const updateInfoScaping = (index, updatedInfo) => {
    // update lại để render ra danh sách lựa chọn vùng cạo
    setInfoScaping((prevInfo) => {
      const newState = [...prevInfo];
      newState[index] = { ...newState[index], ...updatedInfo };
      console.table(newState);
      return newState;
    });
  };

  const updateListScaping = (index, value) => {
    // update lại danh sách đã chọn vùng cạo của người dùng
    setListSpacing((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], ...value };
      console.table(newState);
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
      listSpacing[listSpacing.length - 1]?.land === null || listSpacing[listSpacing.length - 1]?.land === undefined ||
      listSpacing[listSpacing.length - 1]?.row === null || listSpacing[listSpacing.length - 1]?.row === undefined ||
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
    Loading.pulse("Đang xóa...");
    const newList = [...listSpacing]; // sao chép mảng hiện tại
    const newListInfo = [...infoScaping]; // sao chép mảng hiện tại
    // xóa phần tử tương ướng với index
    newList.splice(index, 1);
    newListInfo.splice(index, 1);
    setListSpacing(newList); // cập nhật mảng mới
    setInfoScaping(newListInfo); // cập nhật mảng mới
    Loading.remove();
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
              <div key={index} className={styles.itemUI} style={{ pointerEvents: isEdit ? "auto " : "none" }}>
                {/* chọn lô */}
                <EditDropLandAssignment
                  keyValue={index}
                  landALL={item?.land}
                  onSelectLand={onSelectLand}
                  label={listSpacing[index]?.land}
                  onUnSelectLand={onUnSelectLand}
                  lastItem={lastItem}
                />
                <span className={styles.line}></span>
                {/* chọn hàng */}
                <EditDropTreeRowAssignment
                  keyValue={index}
                  NumRowOfLand={item?.row}
                  onSelectRow={onSelectRow}
                  label={listSpacing[index]?.row}
                  styleCustom={{ pointerEvents: isEdit && listSpacing[index]?.land !== null ? " auto " : "none" }}
                />
                <span className={styles.line}></span>
                {/* cây bắt đầu */}
                <div className={styles.treeBegins} style={{ pointerEvents: isEdit && listSpacing[index]?.row !== null ? "auto" : "none" }}>
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
                <div className={styles.treeBegins} style={{ pointerEvents: isEdit && listSpacing[index]?.row !== null ? "auto" : "none" }}>
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
                  {isEdit && <ButtonDelete text="Xóa" onDelete={() => onDeleteItem(index)} />}
                </div>
              </div>
            );
          })}
        {/* hiển thị lỗi  */}
        <div className={styles.errorItem}>
          <span>{catchError?.landError}</span>
          <span>{catchError?.rowError}</span>
        </div>
        {/* Thêm mới */}
        {isEdit && (
          <div className={styles.btnAddAssignment} onClick={onAddItem}>
            <img className={styles.iconAdd} src={iconAdd} />
            <span>Thêm mới</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBodyAssignmentList;
