import React, { useState, useEffect } from "react";
import styles from "./SelectionBar.module.scss";
import { Modal } from "antd";
import iconSearch from "../../../../../assets/ico/icon-feather-search.png";
import DropTypeOfTree from '../../../../../components/DropDownComponent/DropTypeOfTree';
import DropLand from '../../../../../components/DropDownComponent/DropLand';
import DropTreeRow from '../../../../../components/DropDownComponent/DropTreeRow';
import ButtonIcon from './../../../../../components/Button/ButtonIcon';

const SelectionBar = () => {
  return(
  <div className={styles.selectionBar}>
    <DropTypeOfTree label="Tất cả cây"/>
    <DropLand label="Chọn số lô" />
    <DropTreeRow label="Chọn số hàng" />
    <div className={styles.searchInputTree}>
        <input type="text" placeholder="Nhập tên cây" />
        <ButtonIcon icon={iconSearch} />
    </div>
  </div>
  );
};

export default SelectionBar;
