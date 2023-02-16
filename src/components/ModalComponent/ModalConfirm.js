import React, { useState, useEffect } from "react";
import styles from "./ModalComponent.module.scss";
import { Modal } from "antd";
import "./ModalStyles.css";

const ModalConfirm = ({
    visible,
  title,
  subText,
  textCancel='Hủy',
  textConfirm='Xác nhận',
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      centered={true}
      visible={visible}
    //   onOk={onOk}
      // onCancel={onCancel}
      footer={null}
      width={300}
      animationIn={"slideInTop"}
      animationOut={"slideOutTop"}
      className="modalStyle"
      closable={false}
    >
      <div className={styles.modalConfirm}>
        <div className={styles.modalBody}>
            <span className={styles.titleModal}>{title}</span>
            <span className={styles.subModal}>{subText}</span>
        </div>
        <div className={styles.modalFooter}>
            <button className={styles.btnCannel}>{textCancel}</button>
            <button className={styles.btnConfirm}>{textConfirm}</button>
        </div>
        
      </div>
    </Modal>
  );
};

export default ModalConfirm;
