import React, { useState, useEffect } from "react";
import styles from "./ModalComponent.module.scss";
import { Modal } from "antd";
import iconClose from "../../assets/images/close.png";
import "./ModalStyles.css";

const ModalComponent = ({
  children,
  title,
  visible,
  setVisible,
  width,
  centered = true,
  onCancel,
  onOk,
}) => {
  return (
    <Modal
      centered={centered}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      width={width}
      animationIn={"slideInTop"}
      animationOut={"slideOutTop"}
      className="modalStyle"
      closable={false}
    >
      <div className={styles.headerModal}>
        <span className={styles.titleModal}>{title}</span>
        {/* nút close ở đây */}
        <img
          src={iconClose}
          alt="iconClose"
          className={styles.iconClose}
          onClick={setVisible}
        />
      </div>
      <div className={styles.bodyModal}>{children}</div>
    </Modal>
  );
};

export default ModalComponent;
