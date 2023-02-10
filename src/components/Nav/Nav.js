import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

import iconLocation from "../../assets/ico/icon-location.png";
import iconUser from "../../assets/ico/icon-group-user.png";
import iconList from "../../assets/ico/icon-list.png";
import iconPlantTree from "../../assets/ico/icon-plant-tree.png";

import close from "../../assets/images/close.png";
import { useLocation, useNavigate } from "react-router-dom";
import { changeIsOpen } from "../../store/navRes/navResSlice";
import { useDispatch, useSelector } from "react-redux";
import { isOpen } from "../../store/navRes/navResSelector";
// import { getUserInfor } from '../../store/auth/authThunk';

import styles from "./Nav.module.scss";

function Nav() {
  const navigate = useNavigate();

  // lấy đường dẫn hiện tại để set active cho nav
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // đăng xuất và chuyển hướng đến trang login
  const handleLogOut = () => {
    navigate("/");
    window.location.reload();
  };

  const onChangeNav = (nameRoute) => {
    // sẽ chuyển hướng đến trang /nameRoute
    navigate("/" + nameRoute);

    // đóng nav khi click vào nav dành cho mobile
    // dispatch(changeIsOpen(false));
  };
  return (
    <div className={styles.navStyle}>
      <ul className={styles.ulNav}>
        <li className={styles.logo}>
          <img src={logo} />
        </li>

        {/* màn hình map */}
        <li
          onClick={() => onChangeNav("")}
          className={pathname === "/" ? styles.li_Selected : ""}
        >
          <img src={iconLocation} />
          <span>Map</span>
        </li>

        {/* màn hình quản lý user */}
        <li
          onClick={() => onChangeNav("userManage")}
          className={pathname === "/userManage" ? styles.li_Selected : ""}
        >
          <img src={iconUser} />
          <span>Quản lý User</span>
        </li>

        {/* màn hình quản lý công việc */}
        <li
          onClick={() => onChangeNav("assignment")}
          className={pathname === "/assignment" ? styles.li_Selected : ""}
        >
          <img src={iconList} />
          <span>Quản lý công việc</span>
        </li>

        {/* màn hình quản lý cây */}
        <li
          onClick={() => onChangeNav("treeManage")}
          className={pathname === "/treeManage" ? styles.li_Selected : ""}
        >
          <img src={iconPlantTree} />
          <span>Quản lý cây</span>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
