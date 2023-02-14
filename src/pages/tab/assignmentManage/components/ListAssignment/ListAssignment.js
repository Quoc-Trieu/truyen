import React, { useState } from "react";
import styles from "./ListAssginment.module.scss";
import iconEye from "../../../../../assets/ico/icon-material-remove-green-eye.png";
import iconRemove from "../../../../../assets/ico/icon-remove.png";

const ListAssginment = ({ itemsHeaderRow, assignmenList }) => {

  const onRemove = () => {
    console.log("onRemove listAssignment");
  };


  const onDetail = () => {
    console.log("onDetail");
  };

  return (
    <div className={styles.listAssignment}>
      {/* Header row */}
      <div className={styles.headerRow}>
        {itemsHeaderRow.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>

      {/* Item row */}
      <div className={styles.itemContainer}>
        {assignmenList.map((item, index) => {
          return (
            <div key={index} className={styles.itemUI}>
                {/* Vùng cạo */}
              <div className={styles.shaverAreaStyle}>
                <span>{item?.shaverArea?.name}</span>
                <span>{item?.shaverArea?.time}</span>
              </div>
              {/* Người cạo */}
              <div className={styles.userShaverStyle}>
                <span>{item?.userShaver?.user}</span>
                <span>{item?.userShaver?.phone}</span>
              </div>
                {/* Số lô, hàng, tổng cây cạo */}
              <span>{item?.LotNumShaver} lô</span>
              <span>{item?.LotTreeShaver} hàng</span>
              <span>{item?.TotalTreeShaver} cây</span>

                {/* Action */}
              <div className={styles.actionItem}>
                <img
                  src={iconRemove}
                  className={styles.remove}
                  onClick={onRemove}
                />
                <div className={styles.seeDetails} onClick={onDetail}>
                  <span>Chi tiết</span>
                  <img src={iconEye} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAssginment;
