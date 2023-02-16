import React, { useState, useEffect } from "react";
import styles from "./SelectionBar.module.scss";
import { Modal } from "antd";
import iconSearch from "../../../../../assets/ico/icon-feather-search.png";
import LotNumComponent from './../../../../../components/LotNumComponent/LotNumComponent';
import ButtonIcon from './../../../../../components/Button/ButtonIcon';

const SelectionBar = () => {
  return(
  <div className={styles.selectionBar}>
    <LotNumComponent text="Tất cả cây" typeMenu="col" styleCustom={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070', marginRight: '15px'}}/>
    <LotNumComponent text="Lô số 1" styleCustom={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}/>
    <LotNumComponent text="Hàng số 1" typeMenu="col" styleCustom={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}/>
    <div className={styles.searchInputTree}>
        <input type="text" placeholder="Nhập tên cây" />
        <ButtonIcon icon={iconSearch} />
    </div>
  </div>
  );
};

export default SelectionBar;
