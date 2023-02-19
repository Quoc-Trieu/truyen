import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
import iconSearch from "../../assets/ico/icon-feather-search.png";
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUserBySearch, getALLInfoUser, setSearching } from './../../store/user/UserSlice';

const SearchInput = ({
  initValue,
  placeholder,
  autoFocus,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initValue ?? "");

  const onSubmit = async (text) => {
    dispatch(setSearching(text));
    dispatch(getInfoUserBySearch(text));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(value);
    }
  };

  const onChangeText = (text) => {
    setValue(text.target.value);
    if (text.target.value === "") {
      dispatch(setSearching(""));
      dispatch(getALLInfoUser());
    }
  }

  return (
    <div className={styles.SearchInput}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(text) => onChangeText(text)}
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
