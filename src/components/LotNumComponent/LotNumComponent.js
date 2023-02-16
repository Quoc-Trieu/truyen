import React, { useState, useEffect } from "react";
import styles from "./LotNumComponent.module.scss";
import iconUp from "../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";

const LotNumComponent = ({ subTitle }) => {
  return (
    <div className={styles.lotNumComponent}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.lotNumToggle}>
            <span>{subTitle}</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ padding: 0 }} className="dropMenu_Lo">
          <span className="menu_Lo_subTitle">Chọn lô</span>
          <div className="menu_Lo_render_container">
            <div className="item_Lo_bg_round">
              <Dropdown.Item className="item_Lo">
                <span>1</span>
              </Dropdown.Item>
            </div>
            <div className="item_Lo_bg_round">
              <Dropdown.Item className="item_Lo">
                <span>2</span>
              </Dropdown.Item>
            </div>
            <div className="item_Lo_bg_round">
              <Dropdown.Item className="item_Lo">
                <span>1</span>
              </Dropdown.Item>
            </div>
            <div className="item_Lo_bg_round">
              <Dropdown.Item className="item_Lo">
                <span>1</span>
              </Dropdown.Item>
            </div>
            <div className="item_Lo_bg_round">
              <Dropdown.Item className="item_Lo">
                <span>1</span>
              </Dropdown.Item>
            </div>
          </div>

          <button className="btn_bo_chon_Lo">
            <Dropdown.Item>Bỏ Chọn</Dropdown.Item>
          </button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LotNumComponent;
