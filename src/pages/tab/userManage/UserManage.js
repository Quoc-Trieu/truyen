import React from "react";
import Header from "./../../../components/Header/Header";
import styles from "./UserManage.module.scss";

const UserManage = () => {
  return (
    <div className={styles.userContainer}>
      <Header title="Quản lý User" name="Nguyễn Văn A" />
    </div>
  );
};

export default UserManage;
