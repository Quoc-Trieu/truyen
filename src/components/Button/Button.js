import React, { useState } from "react";
import styles from "./Button.module.scss";
import iconAddUser from "../../assets/ico/icon-awesome-user-plus.png";

const Button = ({ text = "", onSubmit }) => {
  return (
    <div className={styles.buttonComponent} onClick={onSubmit}>
      <img src={iconAddUser} alt="AddUser" />
      <span>{text}</span>
    </div>
  );
};

export default Button;
