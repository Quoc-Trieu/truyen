import React, { useState, useEffect } from 'react';
import styles from './ModalCreateUser.module.scss';
import { Modal } from 'antd';
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from 'react-hook-form';
import ModalComponent from '../../../../../components/ModalComponent/ModalComponent';
import { postCreateUser } from '../../../../../services/userServies';
import RadioButton from './../../../../../components/RadioButton/RadioButton';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { getALLInfoUser, setPageCurrentUser } from '../../../../../store/user/UserSlice';
import { Loading } from 'notiflix';
import { useSelector } from 'react-redux';
import iconUp from '../../../../../assets/ico/icon-feather-chevron-up.png';
import iconDown from '../../../../../assets/ico/icon-feather-chevron-down.png';
import Dropdown from 'react-bootstrap/Dropdown';
import ROLES from '../../../../../constants/roles';
import { getALLUser } from '../../../../../services/userServies';

const ModalCreateUser = ({ visible, onCancel, onOk }) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      password: '',
      userManager: null,
      fullName: '',
      role: '',
      status: 'ACTIVE',
    },
  });
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState();
  const [isDrop, setIsDrop] = useState(false);
  const [listManager, setListManager] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    // lấy danh sách các tổ trưởng (quản lý) để hiển thị trong dropdown
    const getManager = async () => {
      try {
        const response = await getALLUser({
          page: 1,
          limit: 1000,
          userRole: 'MANAGER',
        });
        setListManager(response.data?.users);
      } catch (error) {
        console.log(error);
      }
    };
    getManager();
  }, []);

  const onSelectRole = (role) => {
    //cập nhật giá trị cho selectedRole để render lại RadioButton
    setSelectedRole(role);
    //setValue để lưu giá trị vào hook form
    setValue('role', role?.value);
    // clear chọn quản lý
    onSelectManager({ phone: null });
  };

  const onSelectManager = (item) => {
    //cập nhật giá trị cho selectedRole để render lại RadioButton
    setSelectedManager(item);
    //setValue để lưu giá trị vào hook form
    setValue('userManager', item?._id);
  };

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      Loading.pulse();
      const res = await postCreateUser(data);
      //reload lại danh sách user
      // dispatch(getALLInfoUser());
      reset();
      onOk();
      Loading.remove();
      Notiflix.Notify.success('Tạo tài khoản thành công');
      dispatch(setPageCurrentUser(1));
    } catch (error) {
      Loading.remove();
      console.log(error);
      switch (error?.response?.data?.code) {
        case 'PHONE_IS_EXIST':
          Notiflix.Notify.failure('Số điện thoại đã tồn tại');
          break;
        default:
          Notiflix.Notify.failure('Tạo tài khoản thất bại');
          break;
      }
    }
  };

  const handToggle = (isOpen) => {
    if (isOpen) {
      setIsDrop(true);
    } else {
      setIsDrop(false);
    }
  };

  return (
    <ModalComponent
      title="Tạo Tài Khoản Mới"
      visible={visible}
      // onOk={onOk}
      onCancel={onCancel}
      width={500}
      styleWrapper={{ backgroundColor: '#fff' }}
    >
      <form className={styles.modalWrapper} onSubmit={handleSubmit(onSubmit)}>
        {/* Tài khoản */}
        <span className={styles.label}>Tài khoản</span>
        <input
          placeholder="Nhập sđt người dùng"
          className={styles.input}
          type="text"
          {...register('phone', {
            required: 'Vui lòng không bỏ trống ô này',
            minLength: {
              value: 10,
              message: 'Nhập tối thiểu 10 số',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Nhập đúng định dạng số điện thoại',
            },
          })}
        />
        {errors?.phone && <p className={styles.errorText}>{errors?.phone?.message}</p>}

        {/* Mật khẩu */}
        <span className={styles.label}>Mật khẩu</span>
        <input
          placeholder="Nhập mật khẩu"
          className={styles.input}
          {...register('password', {
            required: 'Vui lòng không bỏ trống ô này',
            minLength: {
              value: 6,
              message: 'Nhập dài hơn 6 ký tự',
            },
          })}
        />
        {errors?.password && <p className={styles.errorText}>{errors?.password?.message}</p>}

        {/* Tên người dùng */}
        <span className={styles.label}>Tên người dùng</span>
        <input
          placeholder="Nhập tên người dùng"
          className={styles.input}
          {...register('fullName', {
            required: true,
          })}
        />
        {errors?.fullName?.type === 'required' ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}

        {/* {permisson == 'ADMIN' ? (
          <>
            <span className={styles.label}>Phân quyền</span>
            <div className={styles.groupAuthorizationUser}>
              <div className={styles.radioGroup} onClick={() => onSelectRole(ROLE.USER)}>
                <RadioButton selected={selectedRole == ROLE.USER} value={selectedRole} />
                <span>User</span>
              </div>
              <div className={styles.radioGroup} onClick={() => onSelectRole(ROLE.MANAGER)}>
                <RadioButton selected={selectedRole == ROLE.MANAGER} value={selectedRole} />
                <span>Quản lý</span>
              </div>
            </div>
          </>
        ) : (
          ''
        )} */}

        {/* Bộ phận */}
        <span className={styles.label}>Bộ phận</span>
        <Dropdown className={styles.dropDown} onToggle={handToggle}>
          <Dropdown.Toggle className={styles.containerToggle} style={{ width: '100%' }}>
            {selectedRole ? <span> {selectedRole.label} </span> : <span> Chọn bộ phận</span>}
            <img src={isDrop ? iconDown : iconUp} />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ padding: 0 }} className={styles.dropMenu}>
            {/* map object ROLES */}
            {Object.values(ROLES).map((item, index) =>
              item.value !== 'ROOT' ? (
                <Dropdown.Item key={index} className={styles.dropItem} onClick={() => onSelectRole(item)}>
                  {item.label}
                </Dropdown.Item>
              ) : (
                ''
              )
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* Tổ Trưởng */}
        {selectedRole?.value === 'USER' ? <span className={styles.label}>Tổ trưởng</span> : ''}
        {selectedRole?.value === 'USER' ? (
          <Dropdown className={styles.dropDown} onToggle={handToggle}>
            <Dropdown.Toggle className={styles.containerToggle} style={{ width: '100%' }}>
              {selectedManager?.fullName ? <span> {selectedManager?.fullName} </span> : <span> Chọn tổ trưởng</span>}
              <img src={isDrop ? iconDown : iconUp} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ padding: 0 }} className={styles.dropMenu}>
              {/* map listManager */}
              {listManager &&
                listManager.map((item, index) => (
                  <Dropdown.Item key={index} className={styles.dropItem} onClick={() => onSelectManager(item)}>
                    {item?.fullName}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          ''
        )}

        <button className={styles.btnSubmit} type="submit">
          Xác nhận
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalCreateUser;
