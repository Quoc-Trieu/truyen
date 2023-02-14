import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
import iconSearch from "../../assets/ico/icon-feather-search.png";

const SearchInput = ({
  onSubmit,
  initValue,
  placeholder,
  onChangeText,
  autoFocus,
}) => {
  const [value, setValue] = useState(initValue ?? "");

  return (
    <div className={styles.SearchInput}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(text) => {
          if (onChangeText) {
            onChangeText(text.target.value);
          }
          setValue(text.target.value);
        }}
        autoFocus={autoFocus}
      />
      <button className={styles.iconSearchCircle} onClick={() => onSubmit(value)}>
        <img src={iconSearch} alt="search" />
      </button>
    </div>
  );
};

export default SearchInput;
