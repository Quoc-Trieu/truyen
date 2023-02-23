import React, { useState, useEffect } from "react";
import styles from "./QuantitySelect.module.scss";

import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import iconUp from "../../assets/ico/icon-awesome-caret-up.png";

const QuantitySelect = ({ value = 0, minValue = 1, maxValue = 1, onChange}) => {
  const [quantity, setQuantity] = useState(value ?? minValue);
  const [ disabledDown, setDisabledDown ] = useState(false);
  const [disabledUp , setDisabledUp ] = useState(false);

  useEffect(() => {
    // onChange(quantity);
    setDisabledDown(quantity <=  minValue ? true : false)
    setDisabledUp(quantity >=  maxValue ? true : false)
    setQuantity(value)
    onChange(value)
  }, [value, minValue, maxValue]);

  useEffect(() => {
    // onChange(quantity);
    setDisabledDown(quantity <=  minValue ? true : false)
    setDisabledUp(quantity >=  maxValue ? true : false)
    setQuantity(quantity)
    if(onChange)
    {
      onChange(quantity)
    }
  }, [quantity]);

  const handleChange = (event) => {
    const regex = /^[0-9]+$/;
    const value = event.target.value;

    if (regex.test(value)) {
      const numValue = parseInt(value);
      if (numValue >= minValue && numValue <= maxValue) {
        setQuantity(numValue);
      }
    }
  };
  return (
    <div className={styles.quantitySelect}>
      <div className={styles.quantity}>
        <input value={quantity} onChange={handleChange} type="text" />
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
