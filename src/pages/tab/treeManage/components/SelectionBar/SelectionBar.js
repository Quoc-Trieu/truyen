import React, { useState, useEffect } from "react";
import styles from "./SelectionBar.module.scss";
import { Modal } from "antd";
import iconSearch from "../../../../../assets/ico/icon-feather-search.png";
import DropTypeOfTree from '../../../../../components/DropDownComponent/DropTypeOfTree';
import DropLand from '../../../../../components/DropDownComponent/DropLand';
import DropTreeRow from '../../../../../components/DropDownComponent/DropTreeRow';
import ButtonIcon from './../../../../../components/Button/ButtonIcon';
import { setFilter, getALLTrees, filterTreeSelector } from "./../../../../../store/tree/TreeSlice";
import { useDispatch, useSelector } from 'react-redux';

const SelectionBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const filterTree = useSelector(filterTreeSelector);
  //nếu chưa chọn hàng thì không bật tìm kiếm theo tên cây
  const disableSearch = filterTree.row == null ? true : false;


  useEffect(() => {
    if (disableSearch) {
      // clear value input khi reset filter
      setValue("");
    }
  }, [disableSearch]);

  const onChangeSearch = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      dispatch(setFilter({ nameTree: null }));
      dispatch(getALLTrees({resetPage: true}));
    }
  };

  const onSearch = () => {
    const searchText = convertToString(value, 3);
    dispatch(setFilter({ nameTree: searchText }));
    dispatch(getALLTrees({resetPage: true}));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const convertToString = (value, length) => {
    // hàm này để convert số thành chuỗi có độ dài length(lấy số convert sang id Cây)
    if (value) {
        return 'C' + value.toString().padStart(length, '0');
    }
    return null;
  }
  return(
  <div className={styles.selectionBar}>
    <DropTypeOfTree label="Tất cả cây"/>
    <DropLand label="Chọn số lô" />
    <DropTreeRow label="Chọn số hàng" />
    <div className={styles.searchInputTree}>
        <input disabled={disableSearch} type="text" placeholder="Nhập tên cây" value={value} onChange={onChangeSearch} onKeyDown={onKeyDown}/>
        <ButtonIcon icon={iconSearch} onSummit={onSearch}/>
    </div>
  </div>
  );
};

export default SelectionBar;
