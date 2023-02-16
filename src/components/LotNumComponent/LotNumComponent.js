import React, { useState, useEffect } from "react";
import styles from "./LotNumComponent.module.scss";
import iconUp from "../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";

const LotNumComponent = ({ text, styleCustom, typeMenu = "row" }) => {
  // type 'row' dành cho lô, type 'col' dành cho hàng
  const type = typeMenu;
  return (
    <div className={styles.lotNumComponent} style={styleCustom}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.lotNumToggle}>
            <span>{text}</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>

        {/* render menu lô */}
        {typeMenu == "row" ? (
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
        ) : null}

        {/* render menu hàng */}
        {typeMenu == "col" ? (
          <Dropdown.Menu
            style={{ padding: 0 }}
            className={styles.dropMenu_hang}
          >
            <Dropdown.Item className={styles.item_hang}>
              <span>1</span>
            </Dropdown.Item>
            <Dropdown.Item className={styles.item_hang}>
              <span>2</span>
            </Dropdown.Item>
            <Dropdown.Item className={styles.item_hang}>
              <span>3</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        ) : null}
      </Dropdown>
    </div>
  );
};

export default LotNumComponent;
