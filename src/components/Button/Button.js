import React, { useState } from "react";
import styles from "./Button.module.scss";

const Button = ({ text = "", onSubmit, styleCustom, icon }) => {
  return (
    <div className={styles.buttonComponent} onClick={onSubmit} style={styleCustom}>
      {icon && <img src={icon} />}
      <span>{text}</span>
    </div>
  );
};

export default Button;

