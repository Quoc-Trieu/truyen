import React, { useState, useEffect } from "react";
import styles from "./QuantitySelect.module.scss";
import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import iconUp from "../../assets/ico/icon-awesome-caret-up.png";

const QuantitySelect = ({ keyValue, value =0, minValue = 1, maxValue = 10, onChange }) => {
  const [quantity, setQuantity] = useState(value);
  console.log(keyValue, " quantity: ", quantity);

  useEffect(() => {
    onChange && onChange(keyValue, quantity);
  }, [quantity]);

  useEffect(() => {
    console.log("==========", value, "==========");
    if (value !== quantity && value !== null && value !== undefined) {
      setQuantity(value);
    }
  }, [value]);

  const handleQuantityChange = (event) => {
    const regex = /^[0-9]+$/;
    const value = event.target.value;

    if (regex.test(value)) {
      const numValue = parseInt(value);
      setQuantity(numValue);
      // if (numValue >= minValue && numValue <= maxValue) {
      // }
    } else if (value === "") {
      setQuantity(null);
    }
  };

  const handleBlur = (event) => {
    const regex = /^[0-9]+$/;
    const value = event.target.value;
    console.log(regex.test(value));

    if (value == null || value === undefined || value === "" || !regex.test(value)) {
      setQuantity(1);
    } else if (value <= minValue) {
      setQuantity(minValue);
    } else if (value >= maxValue) {
      console.log(maxValue);
      setQuantity(maxValue);
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
        <input type="text" value={quantity} onChange={handleQuantityChange} onBlur={handleBlur} />
      </div>
      <div className={styles.selectContainer}>
        <button
          className={styles.btn}
          onClick={incrementQuantity}
          style={{ opacity: quantity >= maxValue ? 0.5 : 1 }}
          disabled={quantity >= maxValue ? true : false}
        >
          <img src={iconUp} alt="increase quantity" />
        </button>
        <button
          className={styles.btn}
          onClick={decrementQuantity}
          style={{ opacity: quantity <= minValue ? 0.5 : 1 }}
          disabled={quantity <= minValue ? true : false}
        >
          <img src={iconDown} alt="decrease quantity" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelect;