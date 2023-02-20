import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";
import { useDispatch } from 'react-redux';
import { filterTreeSelector, setFilter } from "../../store/tree/TreeSlice";
import { useSelector } from 'react-redux';
import { getALLTrees } from './../../store/tree/TreeSlice';

const TREES = {
  ALL: { name: "Tất cả cây", type: null, color: "#707070" },
  X: { name: "Cây cạo", type: "X", color: "#31D100" },
  CD: { name: "Cụt đọt", type: "CD", color: "#43439F" },
  KM: { name: "Khô miệng", type: "KM", color: "#967B38" },
  K: { name: "Cây kém", type: "K", color: "#FFC000" },
  O: { name: "Cây chết", type: "O", color: "#FF2700" },
};

const DropTypeOfTree = ({ label, styleCustom, }) => {
  const dispatch = useDispatch();
  const filterTree = useSelector(filterTreeSelector);
  const onClickItem = (type) => {
    console.log(type);
    dispatch(setFilter({ typeTree: type }));
    dispatch(getALLTrees({resetPage: true}));
    console.log('filterTreeSelector: ', filterTree)
  };
  return (
    <div className={styles.dropDownComponent} style={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070', marginRight: '15px'}}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{label}</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ padding: 0 }}
            className={styles.dropMenu_hang}
          >
            {TREES && Object.values(TREES).map((item, index) => {
              return (
                <Dropdown.Item onClick={() => onClickItem(item?.type)} key={index} className={styles.item_hang}>
                  <span style={{color: item?.color}}>{item?.name}</span>
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropTypeOfTree;
