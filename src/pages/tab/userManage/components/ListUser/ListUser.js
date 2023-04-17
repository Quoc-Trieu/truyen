import React, { useState, useEffect } from "react";
import styles from "./ListUser.module.scss";
import iconEdit from "../../../../../assets/ico/icon-feather-edit.png";
import iconRemove from "../../../../../assets/ico/icon-remove.png";
import iconLock from "../../../../../assets/ico/icon-ionic-lock.png";
import iconUnLock from "../../../../../assets/ico/icon-ionic-unlock.png";
import iconDown from "../../../../../assets/ico/icon-awesome-caret-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import ModalConfirm from "../../../../../components/ModalComponent/ModalConfirm";
import {
  getALLUser,
  putUpdateUser,
  deleteUser,
} from "../../../../../services/userServies";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getALLInfoUser } from "../../../../../store/user/UserSlice";
import { listUserSelector } from "../../../../../store/user/UserSlice";
import Notiflix from "notiflix";
import ModalEditUser from "../ModalCreateUser/ModalEditUser";
import Pagination from "../../../../../components/Pagination/Pagination";
import {
  pageCurrentUserSelector,
  setPageCurrentUser,
} from "./../../../../../store/user/UserSlice";

const roleLabel = { ADMIN: "Admin", MANAGER: "Quản lý", USER: "User" };

const ListUser = ({ itemsHeaderRow }) => {
  const dispatch = useDispatch();
  const listUser = useSelector(listUserSelector);
  const pageCurrentUser = useSelector(pageCurrentUserSelector);

  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemSelect, setItemSelect] = useState();
  // useEffect(() => {
  //   // get Api tất cả user từ redux Thunk
  //   dispatch(getALLInfoUser());
  // }, []);

  useEffect(() => {
    setItemSelect(itemSelect);
  }, [itemSelect]);

  const onEdit = (item) => {
    setItemSelect(item);
    setShowModalEditUser(true);
  };

  const onRemove = (item) => {
    setItemSelect(item);
    setShowModalRemove(true);
  };

  const onDeleteUser = (phone) => {
    deleteUser(phone)
      .then((res) => {
        Notiflix.Notify.success("Xóa thành công sđt: " + phone);
        setShowModalRemove(false);
        dispatch(getALLInfoUser());
      })
      .catch((error) => {
        Notiflix.Notify.warning("Xóa thất bại");
        setShowModalRemove(false);
        dispatch(getALLInfoUser());
      });
  };

  const onChangeLock = async (item) => {
    const { status } = item;
    let newUpdate;
    //Nếu user đăng ACTIVE thì chuyển thành INACTIVE và ngược lại
    if (status == "ACTIVE") {
      newUpdate = {
        fullName: item?.fullName,
        phone: item?.phone,
        status: "INACTIVE",
        role: item?.role[0],
      };
    } else {
      newUpdate = {
        fullName: item?.fullName,
        phone: item?.phone,
        status: "ACTIVE",
        role: item?.role[0],
      };
    }
    //update user
    await putUpdateUser({ phone: item?.phone, data: newUpdate });
    // gọi lại api để lấy lại danh sách user
    dispatch(getALLInfoUser());
  };

  const OnChangePage = (page) => {
    dispatch(setPageCurrentUser(page));
    dispatch(getALLInfoUser());
  };

  return (
    <div className={styles.listUser}>
      {/* Header row */}
      <div className={styles.headerRow}>
        {itemsHeaderRow.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>

      {/* Item row */}
      <div className={styles.itemContainer}>
        { listUser?.users && listUser?.users[0] !== undefined &&
          listUser?.users?.map((item, index) => {
            // kiểm tra trạng thái của user có bị khóa hay không, nếu bị khóa thì trả về true, ngược lại trả về false
            const isUserActive = item?.status == "ACTIVE" ? true : false;
            const getIconUserLocked = isUserActive ? iconUnLock : iconLock;

            return (
              <div key={index} className={styles.itemUI}>
                <span>{item?.phone} </span>
                <span>{item?.fullName} </span>
                <span>{roleLabel[item?.role[0]]} </span>
                <div className={styles.actionItem}>
                  <img
                    src={iconEdit}
                    className={styles.edit}
                    onClick={() => onEdit(item)}
                  />
                  <img
                    src={iconRemove}
                    className={styles.remove}
                    onClick={() => onRemove(item)}
                  />

                  <Dropdown style={{ height: "100%" }} drop="down">
                    <Dropdown.Toggle style={{ height: "100%" }}>
                      <div className={styles.lockUser}>
                        <img
                          src={getIconUserLocked}
                          className={styles.iconLock}
                        />
                        <img src={iconDown} className={styles.iconDown} />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ padding: 0 }}>
                      <Dropdown.Item
                        className={styles.lockDropdown}
                        onClick={() => onChangeLock(item)}
                        style={
                          isUserActive == true
                            ? { background: "#FF3B3B" }
                            : { background: "#00D673" }
                        }
                      >
                        <span className={styles.textDropLock}>
                          {isUserActive == true ? "Khóa" : "Mở khóa"}
                        </span>
                        <img
                          className={styles.iconDropLock}
                          src={isUserActive == true ? iconLock : iconUnLock}
                        />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            );
          }
          
        )}
      </div>
      <Pagination
        align="flex-end"
        initValue={pageCurrentUser}
        pageTotalNum={listUser?.totalPages}
        OnChangePage={OnChangePage}
      />
      
      {/* Modal sửa thông tin user */}
      { itemSelect &&
        <ModalEditUser
        title="Sửa Thông Tin Tài Khoản"
        item={itemSelect}
        visible={showModalEditUser}
        onCancel={() => setShowModalEditUser(false)}
        onOk={() => setShowModalEditUser(false)}
      />
      }
      {/* Modal xác nhận xóa user */}
      { showModalRemove &&
        <ModalConfirm
          visible={showModalRemove}
          title="Xác nhận xóa User"
          subText="Toàn bộ thông tin tài khoản của user sẽ bị xóa vĩnh viễn"
          onCancel={() => setShowModalRemove(false)}
          onConfirm={() => onDeleteUser(itemSelect?.phone)}
        />
      }
      
    </div>
  );
};

export default ListUser;
