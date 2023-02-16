import React, { useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";


const RadioButton = ({ selected = true, onPress }) => {
  return (
    <button disabled={!onPress} onClick={onPress} className={styles.container}>
        {selected && <div className={styles.circle} />}
    </button>
   
  );
};

export default RadioButton;