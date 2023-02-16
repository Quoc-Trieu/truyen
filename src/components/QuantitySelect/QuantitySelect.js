import React, { useState, useEffect } from "react";
import styles from "./QuantitySelect.module.scss";

import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import iconUp from "../../assets/ico/icon-awesome-caret-up.png";

const QuantitySelect = ({ value = 0, onChange }) => {
  const [quantity, setQuantity] = useState(value ?? 0);
  const disabledDown = quantity <= 0 ? true : false;
  const disabledUp = quantity >= 5 ? true : false;
  return (
    <div className={styles.quantitySelect}>
      <div className={styles.quantity}>
        <p>{quantity}</p>
      </div>
      <div className={styles.selectContainer} >
        <button className={styles.btn} onClick={() => setQuantity(quantity + 1)} style={{opacity: disabledUp ? 0.5 : 1}} disabled={disabledUp}>
          <img src={iconUp} />
        </button>
        <button className={styles.btn} onClick={() => setQuantity(quantity - 1)} style={{opacity: disabledDown ? 0.5 : 1}} disabled={disabledDown}>
          <img src={iconDown} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelect;
