import React, { useState, useEffect } from "react";
import styles from "./ListTree.module.scss";
import iconEdit from "../../../../../assets/ico/icon-feather-edit.png";
import ModalDetailsTree from "./../ModalDetailsTree/ModalDetailsTree";
import { useSelector } from "react-redux";
import { infoALLTreeSelector } from "./../../../../../store/user/UserSlice";

const STATUSTREE = {
  X: { name: "Cây cạo", color: "#31D100" },
  CD: { name: "Chưa thu hoạch", color: "#000" },
  K: { name: "Chưa thu hoạch", color: "#31D100" },
  C: { name: "Chưa thu hoạch", color: "#31D100" },
  Y: { name: "Chưa thu hoạch", color: "#31D100" },
};

const ListTree = () => {
  const [showModal, setShowModal] = useState(false);
  const allTree = useSelector(infoALLTreeSelector);
  const [itemTree, setItemTree] = useState();

  const onDetails = (item) => {
    setShowModal(true)
    setItemTree(item)
  };

  return (
    <div className={styles.listTree}>
      <div className={styles.headerListTree}>
        <span>Lô</span>
        <span>Hàng</span>
        <span>Cây</span>
        <span>Trạng thái cây</span>
        <span></span>
      </div>

      <div className={styles.listContainer}>
        {/* Item row */}
        {allTree.map((item, index) => {
          return (
            <div className={styles.itemRow} key={index}>
              <span>{item?.name}</span>
              <span>Hàng số {index + 1}</span>
              <span>Cây số {index + 1}</span>
              <div className={styles.statusTree}>
                <div
                  className={styles.dotStatus}
                  style={{
                    backgroundColor: STATUSTREE?.[item?.status]?.color,
                    borderWidth: "3px",
                    borderColor: "#95FF74",
                  }}
                ></div>
                <span className={styles.statusText}>{STATUSTREE?.[item?.status]?.name}</span>
              </div>
              <div className={styles.seeDetails}>
                <button
                  className={styles.btnSeeDetails}
                  onClick={() => onDetails(item)}
                >
                  <img src={iconEdit} />
                  <span>Chi tiết cây</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ModalDetailsTree
        visible={showModal}
        data={itemTree}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
      />
    </div>
  );
};

export default ListTree;
