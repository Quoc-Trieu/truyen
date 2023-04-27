import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
import iconSearch from "../../assets/ico/icon-feather-search.png";
import { useDispatch, useSelector } from 'react-redux';
import { setSearching } from './../../store/user/UserSlice';

const SearchInput = ({
  initValue,
  placeholder,
  autoFocus,
  onChangeText,
  onSubmit,
}) => {
  const [value, setValue] = useState(initValue ?? "");

  const onSubmitInput = async (value) => {
    onSubmit && onSubmit(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmitInput(value);
    }
  };

  const onChangeTextInput = (text) => {
    onChangeText && onChangeText(text)
    setValue(text);
  }

  return (
    <div className={styles.SearchInput}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(text) => onChangeTextInput(text.target.value)}
        autoFocus={autoFocus}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button className={styles.iconSearchCircle} onClick={() => onSubmit(value)}>
        <img src={iconSearch} alt="search" />
      </button>
    </div>
  );
};

export default SearchInput;
