import React, { useState, useEffect } from "react";
import Header from "./../../../components/Header/Header";
import styles from "./UserManage.module.scss";
import SearchInput from "./../../../components/SearchInput/SearchInput";
import Button from "./../../../components/Button/Button";
import ListUser from "../../../components/ListUser/ListUser";
import Pagination from "../../../components/Pagination/Pagination";
import ModalCreateUser from "./components/ModalCreateUser/ModalCreateUser";
import iconAddUser from "../../../assets/ico/icon-awesome-user-plus.png";

export const itemUser = [
  {
    phone: "01234567891",
    name: "Nguyễn Văn A",
    status: true,
  },
  {
    phone: "01234567892",
    name: "Nguyễn Văn B",
    status: false,
  },
  {
    phone: "01234567893",
    name: "Nguyễn Văn C",
    status: false,
  },
  {
    phone: "01234567894",
    name: "Nguyễn Văn D",
    status: true,
  },
];

const UserManage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.userContainer}>
      <Header title="Quản lý User" name="Nguyễn Văn A" />

      <div className={styles.userBody}>
        <div className={styles.toolbar}>
          <SearchInput
            placeholder="Nhập tên, số điện thoại"
            onSubmit={(searchText) => console.log(searchText)}
          />
          <Button text="Tạo tài khoản" onSubmit={() => setShowModal(true)} icon={iconAddUser}/>
        </div>

        <ListUser
          itemsHeaderRow={["Số điện thoại", "Tên", ""]}
          itemUser={itemUser}
        />
        <Pagination
          align="flex-end"
          OnChangePage={(text) => {
            console.log(text);
          }}
        />
      </div>

      <ModalCreateUser visible={showModal} onCancel={() =>  setShowModal(false)}  onOk={() =>  setShowModal(true)}/>
    </div>
  );
};

export default UserManage;
