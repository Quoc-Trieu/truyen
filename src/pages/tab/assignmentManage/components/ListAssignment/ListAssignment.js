import React, { useState, useEffect } from "react";
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
import ModalEditCreatePartition from './../EditPartition/ModalEditCreatePartition';
import { format } from "date-fns";

const ListAssginment = ({ itemsHeaderRow, assignmenList, reload }) => {
  const [showRemove, setShowRemove] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [itemDetail, setItemDetail] = useState();
  const [list, setList] = useState([]);
  const search = useSelector(searchingAssignmentSelector);
  const listScaping = useSelector(listScapingSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getInfoAllScaping({ page: page, limit: 10, query: search });
        setList(res?.data);
        console.log(res?.data);
      } catch (error) {
        console.log(error)
      }
    }
    getList();
  }, [search, page, showRemove, showEditDetail, reload])


  const formatTime = (dateTimeString) => {
    // Chuyển đổi chuỗi thời gian sang đối tượng Date
    let dateTime = new Date(dateTimeString);

    // Lấy giờ và phút hiện tại
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();

    // Lấy ngày, tháng và năm
    let day = dateTime.getDate();
    let month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    let year = dateTime.getFullYear();

    // Định dạng thời gian mới
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} / ${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    // Trả về định dạng thời gian mới
    return formattedTime;
  }

  const NumLandRowTree = (detail) => {
    let lo = detail?.length;
    let hang = 0;
    let cay = 0;

    if (detail?.length > 0) {
      detail.map((itemLo, index) => {
        // console.log(item?.hang.length);
        hang += itemLo?.hang.length;

        itemLo?.hang.map((itemHang, index) => {
          // console.log(item?.cay.length);
          const arrTree = itemHang?.cay;
          const startTree = parseInt(arrTree[0].slice(arrTree[0].length - 3, arrTree[0].length));
          const endTree = parseInt(arrTree[arrTree.length - 1].slice(arrTree[arrTree.length - 1].length - 3, arrTree[arrTree.length - 1].length));
          cay += (endTree - startTree) + 1;
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

  const onDetail = (item) => {
    setShowEditDetail(true);
    setItemDetail(item);
    console.log("Data Item Detail: ", item);
  };

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
                <div className={styles.seeDetails} onClick={() => onDetail(item)}>
                  <span>Chi tiết</span>
                  <img src={iconEye} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        initValue={1}
        pageTotalNum={list?.totalPages}
        align="flex-end"
        OnChangePage={onChangePage}
      />

      {showRemove &&
        <ModalConfirm
          visible={showRemove}
          title="Xác nhận xóa phân vùng"
          subText="Toàn bộ thông tin phân vùng sẽ sẽ bị xóa vĩnh viễn khỏi hệ thống"
          onCancel={() => setShowRemove(false)}
          onConfirm={() => onSummitDeleteSpacing(itemDelete)}
        />
      }

      {showEditDetail && <ModalEditCreatePartition visible={showEditDetail} onCancel={() => setShowEditDetail(false)} data={itemDetail} />}
    </div>
  );
};

export default ListAssginment;
