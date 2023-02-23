import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../../../../../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../../../../../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";

const DropTreeRowAssignment = ({ label, styleCustom, NumRowOfLand, onSelectRow }) => {
  const onClickItem = (itemHang) => {
    onSelectRow && onSelectRow(itemHang);
  };
  return (
    <div
      className={styles.dropDownComponent}
      style={{ background: "#fff", padding: "0px 10px" }}
    >
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{label ? "Hàng số " + label.slice(label.length - 3, label.length) : "Chọn hàng"}</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ padding: 0 }} className={styles.dropMenu_hang}>
          {NumRowOfLand &&
            Object.values(NumRowOfLand).map((item, index) => {
              return (
                <Dropdown.Item onClick={() => onClickItem(item)} key={index} className={styles.item_hang}>
                  <span>Hàng số {item?.name.substring(item?.name.length - 3)}</span>
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropTreeRowAssignment;
