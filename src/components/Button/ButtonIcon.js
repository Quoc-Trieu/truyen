import React, { useState } from "react";
import styles from "./Button.module.scss";

export const ButtonIcon = ({ icon, onSummit, styleCustom }) => {
    // vi du dung styleCustom chỉnh background => styleCustom={{background: 'linear-gradient(90deg, #6AB100 0%, #85E000 100%)'}}
  return (
    <div className={styles.buttonIcon} onClick={onSummit}  style={styleCustom}>
      <img src={icon} />
    </div>
  );
};

export default ButtonIcon;
