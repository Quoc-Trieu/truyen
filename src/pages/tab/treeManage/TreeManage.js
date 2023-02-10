import React from 'react'
import styles from "./TreeManage.module.scss";
import Header from "./../../../components/Header/Header";

const TreeManage = () => {
  return (
    <div className={styles.treeManageContainer}>
      <Header title="Quản lý cây" name="Nguyễn Văn A" />
    </div>
  )
}

export default TreeManage