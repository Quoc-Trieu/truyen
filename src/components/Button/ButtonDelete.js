import React, { useState } from "react";
import styles from "./Button.module.scss";
import iconDelete from "../../assets/ico/icon-trash-can.png";

export const ButtonDelete = ({ text = "", onDelete, styleCustom }) => {
  return (
    <div className={styles.buttonDeleteComponent} onClick={onDelete} style={styleCustom}>
      <span>{text}</span>
      <img src={iconDelete} />
    </div>
  );
};

export default ButtonDelete;
