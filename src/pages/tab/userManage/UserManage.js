import React, { useState, useEffect } from "react";
import Header from "./../../../components/Header/Header";
import styles from "./UserManage.module.scss";
import SearchInput from "./../../../components/SearchInput/SearchInput";
import Button from "./../../../components/Button/Button";
import ListUser from "./components/ListUser/ListUser";
import Pagination from "../../../components/Pagination/Pagination";
import ModalCreateUser from "./components/ModalCreateUser/ModalCreateUser";
import iconAddUser from "../../../assets/ico/icon-awesome-user-plus.png";
import { useDispatch } from 'react-redux';
import { getALLInfoUser, setSearching } from './../../../store/user/UserSlice';


const UserManage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (text) => {
    dispatch(setSearching(text));
    dispatch(getALLInfoUser());
  };
  const onChangeText = (text) => {
    if (text === "") {
      dispatch(setSearching(""));
      dispatch(getALLInfoUser());
    }
  }
  return (
    <div className={styles.userContainer}>
      <Header title="Quản lý User" name="Nguyễn Văn A" />

      <div className={styles.userBody}>
        <div className={styles.toolbar}>
          <SearchInput
            placeholder="Nhập tên, số điện thoại"
            onSubmit={onSubmit}
            onChangeText={onChangeText}
          />
          <Button text="Tạo tài khoản" onSubmit={() => setShowModal(true)} icon={iconAddUser}/>
        </div>

        <ListUser
          itemsHeaderRow={["Số điện thoại", "Tên", ""]}
        />
      </div>

      <ModalCreateUser visible={showModal} onCancel={() =>  setShowModal(false)}  onOk={() =>  setShowModal(false)}/>
    </div>
  );
};

export default UserManage;
