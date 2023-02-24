import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../../../../../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../../../../../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";

const EditDropLandAssignment = ({ label, styleCustom, landALL, onSelectLand, onUnSelectLand }) => {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const onClickItemLand = (item) => {
    console.log(item);
    onSelectLand && onSelectLand(item);
  };

  const onUnSelectLandItem = () => {
    onUnSelectLand && onUnSelectLand();
  };

  const onToggle = (isOpen) => {
    if (isOpen) {
      setIsOpenDrop(true);
    }else{
      setIsOpenDrop(false);
    }
    console.log(isOpen);
  };
  return (
    <div
      className={styles.dropDownComponent}
      style={{ background: "#fff", padding: "0px 10px" }}
    >
      <Dropdown drop="down" className="drop" onToggle={onToggle}>
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span> {label ? "Lô số " + label : "Chọn Lô"}</span>
            <img src={isOpenDrop ? iconDown :  iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ padding: 0 }} className="dropMenu_Lo">
          <span className="menu_Lo_subTitle">Chọn lô</span>
          <div className="menu_Lo_render_container">
            {landALL &&
              Object.values(landALL).map((item, index) => {
                return (
                  <div key={index} className="item_Lo_bg_round">
                    <Dropdown.Item className="item_Lo" onClick={() => onClickItemLand(item)}>
                      <span>{item?.name.substring(item?.name.length - 2)}</span>
                    </Dropdown.Item>
                  </div>
                );
              })}
          </div>
          <button className="btn_bo_chon_Lo" onClick={onUnSelectLandItem}>
            <Dropdown.Item>Bỏ Chọn</Dropdown.Item>
          </button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default EditDropLandAssignment;
