import React from "react";
import styles from "./Header.module.scss";
import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import avatar from "../../assets/images/avatar-account.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { removeToken } from './../../utils/localStorage';
import { useSelector } from 'react-redux';
import { userInfoSelector } from "../../store/user/UserSlice";

const assignment = ({ title, name }) => {
  const navigate = useNavigate();
  const userInfo = useSelector(userInfoSelector)

  //logout
  const handleLogOut =  () => {
    removeToken();
    navigate("/");
    window.location.reload();
  }
  return (
    <div className={styles.headerStyle}>
      <div className={styles.headerLeft}>
        <span>{title}</span>
      </div>

      <div className={styles.headerRight}>
        {/* Dropdown Account */}
        <Dropdown>
          <Dropdown.Toggle>
            <div className={styles.btnAccount}>
              <img src={avatar} className={styles.avatarProfile} />
              <span>{userInfo?.fullName}</span>
              <img src={iconDown} className={styles.iconBlackDown} />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ padding: 0}}>
            <Dropdown.Item className={styles.itemDropdown}>
              Đổi mật khẩu
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.itemDropdown}
              onClick={handleLogOut}
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
