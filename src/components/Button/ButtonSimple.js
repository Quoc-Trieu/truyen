import React, { useState } from "react";
import styles from "./Button.module.scss";

export const ButtonSimple = ({ text = "", icon, onSummit, styleCustom, bold=false, width }) => {
    // vi du dung styleCustom chỉnh background => styleCustom={{background: 'linear-gradient(90deg, #6AB100 0%, #85E000 100%)'}}
  return (
    <div className={styles.buttonSimple} onClick={onSummit}  style={{width: width, ...styleCustom}}>
      {icon && <img src={icon} alt="icon" />}
      <span style={{fontWeight: bold ? 'bold' : 400}}>{text}</span>
    </div>
  );
};

export default ButtonSimple;
