import React from "react";
import styles from "./TreeManage.module.scss";
import Header from "./../../../components/Header/Header";
import SelectionBar from './components/SelectionBar/SelectionBar';
import BoxTreeParameter from './components/BoxTreeParameter/BoxTreeParameter';
import Pagination from './../../../components/Pagination/Pagination';
import ListTree from './components/ListTree/ListTree';

const TreeManage = () => {
  return (
    <div className={styles.treeManageContainer}>
      <Header title="Quản lý cây" name="Nguyễn Văn A" />

      <div className={styles.treeManageBody}>
        <SelectionBar />
        <BoxTreeParameter />
        <ListTree />

      </div>
    </div>
  );
};

export default TreeManage;
