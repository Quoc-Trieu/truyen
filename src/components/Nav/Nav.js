import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';

import iconLocation from '../../assets/ico/icon-location.png';
import iconUser from '../../assets/ico/icon-group-user.png';
import iconList from '../../assets/ico/icon-list.png';
import iconPlantTree from '../../assets/ico/icon-plant-tree.png';
import iconOpenNav from '../../assets/ico/icon-close-menu.png';
import iconPieChart from '../../assets/ico/icon-pie-chart.png';
import iconReminder from '../../assets/ico/icon-reminder.png';
import iconSalary from '../../assets/ico/icon-salary.png';

import close from '../../assets/images/close.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeIsOpen } from '../../store/navRes/navResSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isOpen } from '../../store/navRes/navResSelector';
// import { getUserInfor } from '../../store/auth/authThunk';
import styles from './Nav.module.scss';

function Nav() {
  const navigate = useNavigate();
  const permisson = useSelector((state) => state.auth.role);

  // lấy đường dẫn hiện tại để set active cho nav
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [isOpenNav, setIsOpenNav] = useState(true);

  // đăng xuất và chuyển hướng đến trang login
  const handleLogOut = () => {
    navigate('/');
    window.location.reload();
  };

  const onChangeNav = (nameRoute) => {
    // sẽ chuyển hướng đến trang /nameRoute
    navigate('/' + nameRoute);

    // đóng nav khi click vào nav dành cho mobile
    // dispatch(changeIsOpen(false));
  };
  return (
    <div className={styles.navStyle} width={isOpenNav ? '250px' : '100px'}>
      <ul className={styles.ulNav}>
        <li onClick={() => onChangeNav('')} className={pathname === '/' ? styles.li_Selected : ''}>
          <img src={iconUser} />
          {isOpenNav && <span>Quản lý user</span>}
        </li>
        <li onClick={() => onChangeNav('tacgiaManage')} className={pathname === '/tacgiaManage' ? styles.li_Selected : ''}>
          <img src={iconUser} />
          {isOpenNav && <span>Quản lý tác giả</span>}
        </li>
        <li onClick={() => onChangeNav('BinhLuanManage')} className={pathname === '/BinhLuanManage' ? styles.li_Selected : ''}>
          <img src={iconUser} />
          {isOpenNav && <span>Kiểm duyệt bình luận</span>}
        </li>
      </ul>

      <div className={styles.footerNav}>
        <div className={styles.openNav}>
          {isOpenNav && <p className={styles.line}></p>}
          <img onClick={() => setIsOpenNav(!isOpenNav)} src={iconOpenNav} width="35px" height="35px" style={{ transform: isOpenNav ? '' : 'rotate( -180deg )' }} />
        </div>
      </div>
    </div>
  );
}

export default Nav;
