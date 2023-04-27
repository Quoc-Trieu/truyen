import React, { useState, useEffect } from 'react';
import Header from './../../../components/Header/Header';
import styles from './UserManage.module.scss';
import SearchInput from './../../../components/SearchInput/SearchInput';
import Button from './../../../components/Button/Button';
import ListUser from './components/ListUser/ListUser';
import Pagination from '../../../components/Pagination/Pagination';
import ModalCreateUser from './components/ModalCreateUser/ModalCreateUser';
import iconAddUser from '../../../assets/ico/icon-awesome-user-plus.png';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterUser, setSearching, setPageCurrentUser } from './../../../store/user/UserSlice';
import iconUp from '../../..//assets/ico/icon-feather-chevron-up.png';
import iconDown from '../../../assets/ico/icon-feather-chevron-down.png';
import Dropdown from 'react-bootstrap/Dropdown';
import ROLES from '../../../constants/roles';

const UserManage = () => {
  // dùng value truyền pẩm để lấy User, ADMIN lấy tất cả, MANAGER lấy User, User lấy quản lý
  const [showModal, setShowModal] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [labelMenu, setLabelMenu] = useState();
  const [isReload, setIsReload] = useState(false);

  const dispatch = useDispatch();
  const permisson = useSelector((state) => state.auth.role);
  const filterUser = useSelector((state) => state.user.filterUser);
  const permissionEditUser = useSelector((state) => state.auth.permissionEdit);

  useEffect(() => {
    // set label từ giá trj redux
    const filteredRoles = Object.values(ROLES).filter((role) => role.value == filterUser);
    setLabelMenu(filteredRoles[0]?.label ?? 'Tất cả');
  }, [filterUser]);

  useEffect(() => {
    dispatch(setSearching(''));
    dispatch(setPageCurrentUser(1));
  }, []);

  const onSubmit = async (text) => {
    dispatch(setSearching(text));
    dispatch(setPageCurrentUser(1));
  };
  const onChangeText = (text) => {
    if (text === '') {
      dispatch(setSearching(''));
      dispatch(setPageCurrentUser(1));
    }
  };

  const onClickItem = (item) => {
    setLabelMenu(item.label);
    dispatch(setFilterUser(item.value));
    dispatch(setPageCurrentUser(1));
  };

  const handToggle = (isOpen) => {
    if (isOpen) {
      setIsDrop(true);
    } else {
      setIsDrop(false);
    }
  };
  return (
    <div className={styles.userContainer}>
      <Header title="Quản lý User" name="Nguyễn Văn A" />

      <div className={styles.userBody}>
        <div className={styles.toolbar}>
          <SearchInput placeholder="Nhập tên, số điện thoại" onSubmit={onSubmit} onChangeText={onChangeText} />
          <Button
            styleCustom={{ pointerEvents: permissionEditUser ? 'auto' : 'none' }}
            text="Tạo tài khoản"
            onSubmit={() => setShowModal(true)}
            icon={iconAddUser}
          />
        </div>

        {
          //phần loại user dành cho admin
          permisson == 'ADMIN' && (
            <div className={styles.filterPermission}>
              <Dropdown drop="down" className="drop" onToggle={handToggle}>
                <Dropdown.Toggle>
                  <div className={styles.dropLotToggle}>
                    <span>{labelMenu}</span>
                    <img src={isDrop ? iconDown : iconUp} className={styles.iconDownEx} />
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.filterPermissionMenu}>
                  {/* map object ROLES */}
                  {Object.values(ROLES).map((item, index) => {
                    return (
                      <Dropdown.Item className={styles.itemMenu} key={index} onClick={() => onClickItem(item)}>
                        {item?.label}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )
        }

        <ListUser isReload={isReload} itemsHeaderRow={['Số điện thoại', 'Tên', 'Phân quyền', '']} />
      </div>

      <ModalCreateUser
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => {
          setShowModal(false);
          setIsReload(!isReload);
        }}
      />
    </div>
  );
};

export default UserManage;
