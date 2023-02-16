import React, { useState, useEffect } from "react";
import styles from "./ListTree.module.scss";
import iconEdit from "../../../../../assets/ico/icon-feather-edit.png";
import ModalDetailsTree from './../ModalDetailsTree/ModalDetailsTree';

const ListTree = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.listTree}>
      <div className={styles.headerListTree}>
        <span>Lô</span>
        <span>Hàng</span>
        <span>Cây</span>
        <span>Trạng thái cây</span>
        <span></span>
      </div>

      {/* Item row */}
      <div className={styles.listContainer}>
        <div className={styles.itemRow}>
          <span>Lô số 1</span>
          <span>Hàng số 1</span>
          <span>Cây số 1</span>
          <div className={styles.statusTree}>
            <div className={styles.dotStatus} style={{backgroundColor: '#31D100', borderWidth: '3px', borderColor: '#95FF74',}}></div>
            <span className={styles.statusText}>Cây cạo</span>
          </div>
          <div className={styles.seeDetails}>
            <button className={styles.btnSeeDetails} onClick={() => setShowModal(true)}>
              <img src={iconEdit} />
              <span>Chi tiết cây</span>
            </button>
          </div>
        </div>
      </div>
         

      <ModalDetailsTree visible={showModal} onCancel={() =>  setShowModal(false)}  onOk={() =>  setShowModal(false)}/>
    </div>
  );
};

export default ListTree;
