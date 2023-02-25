import React, { useState, useEffect } from "react";
import styles from "./QuantitySelect.module.scss";
import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import iconUp from "../../assets/ico/icon-awesome-caret-up.png";

const QuantitySelect = ({ value = 1, minValue = 1, maxValue = 10, onChange }) => {
  const [quantity, setQuantity] = useState(value);
  const [disabledDown, setDisabledDown] = useState(false);
  const [disabledUp, setDisabledUp] = useState(false);

  useEffect(() => {
    setDisabledDown(quantity <= minValue);
    setDisabledUp(quantity >= maxValue);
    onChange && onChange(quantity);
  }, [quantity, minValue, maxValue]);

  useEffect(() => {
    if(value) {
      setQuantity(value);
    }
  }, [value]);

  const handleQuantityChange = (event) => {
    const regex = /^[0-9]+$/;
    const value = event.target.value;

    if (regex.test(value)) {
      const numValue = parseInt(value);
      if (numValue >= minValue && numValue <= maxValue) {
        setQuantity(numValue);
      }
    }
  };

  const incrementQuantity = () => {
    if (quantity < maxValue) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > minValue) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.quantitySelect}>
      <div className={styles.quantity}>
        <input
          type="text"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div className={styles.selectContainer}>
        <button
          className={styles.btn}
          onClick={incrementQuantity}
          style={{ opacity: disabledUp ? 0.5 : 1 }}
          disabled={disabledUp}
        >
          <img src={iconUp} alt="increase quantity" />
        </button>
        <button
          className={styles.btn}
          onClick={decrementQuantity}
          style={{ opacity: disabledDown ? 0.5 : 1 }}
          disabled={disabledDown}
        >
          <img src={iconDown} alt="decrease quantity" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelect;