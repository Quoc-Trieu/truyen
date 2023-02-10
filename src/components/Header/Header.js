import React from "react";
import styles from "./Header.module.scss";
import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import avatar from "../../assets/images/avatar-account.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const assignment = ({ title, name }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerStyle}>
      <div className={styles.headerLeft}>
        <span>{title}</span>
      </div>

      <div className={styles.headerRight}>
        {/* Dropdown Account */}
        <Dropdown>
          <Dropdown.Toggle>
            <div className={styles.btnAccount} onClick={() => console.log(123)}>
              <img src={avatar} className={styles.avatarProfile} />
              <span>{name ?? "Tên"}</span>
              <img src={iconDown} className={styles.iconBlackDown} />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ padding: 0 }}>
            <Dropdown.Item className={styles.itemDropdown}>
              Đổi mật khẩu
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.itemDropdown}
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Đăng xuất
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default assignment;
