import React, { useState, useEffect } from "react";
import styles from "./ListUser.module.scss";
import iconEdit from "../../assets/ico/icon-feather-edit.png";
import iconRemove from "../../assets/ico/icon-remove.png";
import iconLock from "../../assets/ico/icon-ionic-lock.png";
import iconUnLock from "../../assets/ico/icon-ionic-unlock.png";
import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import ModalConfirm from './../ModalComponent/ModalConfirm';
import { getALLUser, putUpdateUser } from './../../services/userServies';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getInfoUser } from './../../store/user/UserSlice';

const ListUser = ({
  itemsHeaderRow,
  itemUser,
}) => {
  const [showModalRemove, setShowModalRemove] = useState(false);

  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const getAPI =  async () => {
      try {
        const res = await getALLUser({ page: 1, limit: 10, userRole: 'ADMIN',});
        setListUser(res?.data);
      } catch (error) {
        console.log('Error getALLUser: ' + error);
      }
    }
    getAPI();
  }, []);

  const dispatch = useDispatch();

  // const phone = useSelector((state) => state.user.phone);
  // const user = useSelector((state) => state.user.userInfo);
  // dispatch(getInfoUser(phone))
  // console.log(phone + JSON.stringify(user));

  const onEdit = () => {
    console.log("onEdit");
  };

  const onRemove = () => {
    setShowModalRemove(true)
  };

  const onLock = () => {
    console.log("onLock");
  };

  const onChangeLock = async (item) => {
    const { status } = item;
    let newUpdate;
    if (status == "ACTIVE") {
      newUpdate = {...item, status: "INACTIVE"};
    }else{
      newUpdate = {...item, status: "ACTIVE"};
    }
    await putUpdateUser(newUpdate);
    // console.log(newUpdate);
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
        {listUser.map((item, index) => {
          // kiểm tra trạng thái của user có bị khóa hay không, nếu bị khóa thì trả về true, ngược lại trả về false
          const isUserActive = item?.status == 'ACTIVE' ? true : false;
          const getIconUserLocked = isUserActive ? iconUnLock : iconLock;

          return (
            <div key={index} className={styles.itemUI}>
              <span>{item?.phone} </span>
              <span>{item?.fullName} </span>
              <div className={styles.actionItem}>
                <img src={iconEdit} className={styles.edit} onClick={onEdit} />
                <img
                  src={iconRemove}
                  className={styles.remove}
                  onClick={onRemove}
                />

                <Dropdown style={{height :'100%'}}>
                  <Dropdown.Toggle style={{height :'100%'}}>
                    <div className={styles.lockUser} onClick={onLock}>
                      <img
                        src={getIconUserLocked}
                        className={styles.iconLock}
                      />
                      <img src={iconDown} className={styles.iconDown} />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ padding: 0 }} align='end'>
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
        })}
      </div>


      <ModalConfirm visible={showModalRemove} title="Xác nhận xóa User" subText="Toàn bộ thông tin tài khoản của user sẽ bị xóa vĩnh viễn"/>
    </div>
  );
};

export default ListUser;
