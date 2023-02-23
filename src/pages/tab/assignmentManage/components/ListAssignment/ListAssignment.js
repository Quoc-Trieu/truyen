import React, { useState,useEffect } from "react";
import styles from "./ListAssginment.module.scss";
import iconEye from "../../../../../assets/ico/icon-material-remove-green-eye.png";
import iconRemove from "../../../../../assets/ico/icon-remove.png";
import { getInfoAllScaping } from "../../../../../services/assignmentServices";
import { getInfo } from "../../../../../services/userServies";
import { deleteScaping } from './../../../../../services/assignmentServices';
import ModalConfirm from './../../../../../components/ModalComponent/ModalConfirm';
import { useSelector } from 'react-redux';
import { searchingAssignmentSelector, listScapingSelector } from './../../../../../store/assignment/AssignmentSlice';
import Pagination from './../../../../../components/Pagination/Pagination';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix';

const ListAssginment = ({ itemsHeaderRow, assignmenList }) => {
  const [showRemove, setShowRemove] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [list, setList] = useState([]);
  const search = useSelector(searchingAssignmentSelector);
  const listScaping = useSelector(listScapingSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getInfoAllScaping({page: page, limit: 10, query: search});
        setList(res?.data);
        console.log(res?.data);
      } catch (error) {
        console.log(error)
      }
    }
    getList();
  }, [search, page, showRemove, listScaping])


  const onDetail = () => {
    console.log("onDetail");
  };

  const formatTime = (inputString) => {
    // Chuyển chuỗi thành đối tượng Date
    const dt = new Date(inputString.slice(0, -1));
    // Định dạng lại thời gian
    const timeStr = dt.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
    const dateStr = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
    // Trả về chuỗi định dạng
    return `${timeStr} / ${dateStr}`;
  }

  const NumLandRowTree = (item) => {
    let lo = item.length;
    let hang=0;
    let cay=0;

    if (item?.length > 0) {
      item.map((item, index) => {
        // console.log(item?.hang.length);
        hang += item?.hang.length;

        item?.hang.map((item, index) => {
          // console.log(item?.cay.length);
          cay += item?.cay.length;
        })
      })
    }
    return { lo, hang, cay };
  }

  const onSummitDeleteSpacing = async (idScaping) => {
    //hàm này xử lý khi người dùng nhấn xác nhận xóa
    try {
      Loading.standard('Đang xóa vùng cạo...');
      const res = await deleteScaping(idScaping);
      console.log(res);
      Loading.remove();
      Notiflix.Notify.success('Xóa thành công vùng cạo');
    } catch (error) {
      Loading.remove();
      Notiflix.Notify.failure('Xóa vùng cạo thất bại');
      console.log(error);
    }
    setShowRemove(false);
  }
  const onRemove = (item) => {
    setShowRemove(true);
    console.log(item);
    setItemDelete(item?._id);
  };

  const onChangePage = (page) => {
    setPage(page);
  }

  return (
    <div className={styles.listAssignment}>
      {/* Header row */}
      <div className={styles.headerRow}>
        {itemsHeaderRow.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>

      {/* Item row */}
      <div className={styles.itemContainer}>
        {list?.data && list?.data.map((item, index) => {
          return (
            <div key={index} className={styles.itemUI}>
                {/* Vùng cạo */}
              <div className={styles.shaverAreaStyle}>
                <span>{item?.name}</span>
                <span>{formatTime(item?.createdAt)}</span>
              </div>
              {/* Người cạo */}
              <div className={styles.userShaverStyle}>
                <span>{item?.nameUser}</span>
                <span>{item?.idUserPartition}</span>
              </div>
                {/* Số lô, hàng, tổng cây cạo */}
              <span>{NumLandRowTree(item?.detail).lo} lô</span>
              <span>{NumLandRowTree(item?.detail).hang} hàng</span>
              <span>{NumLandRowTree(item?.detail).cay} cây</span>

                {/* Action */}
              <div className={styles.actionItem}>
                <img
                  src={iconRemove}
                  className={styles.remove}
                  onClick={() => onRemove(item)}
                />
                <div className={styles.seeDetails} onClick={onDetail}>
                  <span>Chi tiết</span>
                  <img src={iconEye} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        initValue = {1}
        pageTotalNum={list?.totalPages}
          align="flex-end"
          OnChangePage={onChangePage}
        />

      { showRemove &&
        <ModalConfirm
          visible={showRemove}
          title="Xác nhận xóa phân vùng"
          subText="Toàn bộ thông tin phân vùng sẽ sẽ bị xóa vĩnh viễn khỏi hệ thống"
          onCancel={() => setShowRemove(false)}
          onConfirm={() => onSummitDeleteSpacing(itemDelete)}
        />
      }

    </div>
  );
};

export default ListAssginment;
