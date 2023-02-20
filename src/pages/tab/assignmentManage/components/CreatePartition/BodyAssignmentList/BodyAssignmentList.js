import React, { useState, useEffect } from "react";
import styles from "./BodyAssignmentList.module.scss";
import iconAdd from "../../../../../../assets/ico/icon-ionic-add.png";
import ModalComponent from "../../../../../../components/ModalComponent/ModalComponent";
import ButtonDelete from "../../../../../../components/Button/ButtonDelete";
import DropLandRow from '../../../../../../components/DropDownComponent/DropLand';
import QuantitySelect from '../../../../../../components/QuantitySelect/QuantitySelect';

const BodyAssignmentList = () => {
  return (
    <div className={styles.bodyAssignmentList}>
      <div className={styles.headerRow}>
        <span>Lô</span>
        <span>Hàng</span>
        <span>Cây bắt đầu</span>
        <span>Cây kết thúc</span>
        <span></span>
      </div>

      {/* Item row */}
      <div className={styles.ListContainer}>
        <div className={styles.itemUI}>
            {/* <DropLandRow text="Lô số 1" />
            <DropLandRow text="Hàng số 1" /> */}
            <div className={styles.treeBegins}>
              <span>Nhập cây bắt đầu</span>
              <QuantitySelect />
            </div>
            <div className={styles.treeBegins}>
              <span>Nhập cây bắt đầu</span>
              <QuantitySelect />
            </div>
            <div className={styles.btnDelete}>
              <ButtonDelete text="Xóa" onDelete={() => console.log("Xóa")}/>
            </div>
        </div>

        {/* Thêm mới */}
        <div className={styles.btnAddAssignment}>
          <img className={styles.iconAdd} src={iconAdd} />
          <span>Thêm mới</span>
        </div>
      </div>      
    </div>
  );
};

export default BodyAssignmentList;
