import React, { useState, useEffect } from "react";
import Header from "./../../../components/Header/Header";
import styles from "./UserManage.module.scss";
import SearchInput from "./../../../components/SearchInput/SearchInput";
import Button from "./../../../components/Button/Button";
import ListUser from "./components/ListUser/ListUser";
import Pagination from "../../../components/Pagination/Pagination";
import ModalCreateUser from "./components/ModalCreateUser/ModalCreateUser";
import iconAddUser from "../../../assets/ico/icon-awesome-user-plus.png";
import { useDispatch, useSelector } from "react-redux";
import { getALLInfoUser, setFilterUser, setSearching, setPageCurrentUser } from "./../../../store/user/UserSlice";
import iconUp from "../../..//assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";

const UserManage = () => {
  // dùng value truyền pẩm để lấy User, ADMIN lấy tất cả, MANAGER lấy User, User lấy quản lý
  const ROLES ={ admin : {label: "Tất cả", value: "ADMIN"}, manager:{label: "Quản lý", value: "USER"}, user: {label: "Người dùng", value: "MANAGER"}}
  const [showModal, setShowModal] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [labelMenu, setLabelMenu] = useState();
  
  const dispatch = useDispatch();
  const permisson = useSelector(state => state.user.role)
  const filterUser = useSelector(state => state.user.filterUser)
  const searchText = useSelector(state => state.user.searching)

  useEffect(() => {
    // set label từ giá trj redux
    const filteredRoles = Object.values(ROLES).filter(role => role.value == filterUser);
    setLabelMenu(filteredRoles[0].label);
  }, [filterUser])

  useEffect(() => {
    dispatch(setSearching(""));
    dispatch(getALLInfoUser());
  }, []);

  const onSubmit = async (text) => {
    dispatch(setSearching(text));
    dispatch(getALLInfoUser());
  };
  const onChangeText = (text) => {
    if (text === "") {
      dispatch(setSearching(""));
      dispatch(getALLInfoUser());
    }
  };

  const onClickItem = (item) => {
    setLabelMenu(item.label);
    dispatch(setFilterUser(item.value));
    dispatch(setPageCurrentUser(1));
    dispatch(getALLInfoUser());
  }

  const handToggle = (isOpen) => {
    if (isOpen) {
      setIsDrop(true);
    }else {
      setIsDrop(false);
    }
  }
  return (
    <div className={styles.userContainer}>
      <Header title="Quản lý User" name="Nguyễn Văn A" />

      <div className={styles.userBody}>
        <div className={styles.toolbar}>
          <SearchInput placeholder="Nhập tên, số điện thoại" onSubmit={onSubmit} onChangeText={onChangeText} />
          <Button text="Tạo tài khoản" onSubmit={() => setShowModal(true)} icon={iconAddUser} />
        </div>

        { //phần loại user dành cho admin
          permisson == 'ADMIN' &&
          <div className={styles.filterPermission}>
          <Dropdown drop="down" className="drop" onToggle={handToggle}>
            <Dropdown.Toggle>
              <div className={styles.dropLotToggle}>
                <span>{labelMenu}</span>
                <img src={isDrop ? iconDown : iconUp} className={styles.iconDownEx} />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu  className={styles.filterPermissionMenu}>
              <Dropdown.Item className={styles.itemMenu} onClick={() => {onClickItem(ROLES.admin)}}>
                <span>Tất cả</span>
              </Dropdown.Item>
              <Dropdown.Item className={styles.itemMenu} onClick={() => {onClickItem(ROLES.manager)}}>
                <span>Quản lý</span>
              </Dropdown.Item>
              <Dropdown.Item className={styles.itemMenu} onClick={() => {onClickItem(ROLES.user)}}>
                <span>Người dùng</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        }
       
        <ListUser itemsHeaderRow={["Số điện thoại", "Tên", "Phân quyền", ""]} />
      </div>

      <ModalCreateUser visible={showModal} onCancel={() => setShowModal(false)} onOk={() => setShowModal(false)} />
    </div>
  );
};

export default UserManage;
