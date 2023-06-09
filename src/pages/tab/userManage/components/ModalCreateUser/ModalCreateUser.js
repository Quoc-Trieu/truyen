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
  // role
  const role = useSelector(state => state.auth)
  // console.log(role.role);   MANAGER
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
  const [errManager, setErrManager] = useState(false);

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
    if (selectedManager) {
      setErrManager(false)
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
        // console.log(error.response.data.response.message[0]);
        // console.log(error?.response?.data?.code);
        switch (error.response.data.response.message[0]) {
          case 'PHONE_IS_EXIST':
            Notiflix.Notify.failure('Số điện thoại đã tồn tại');
            break;
          case 'phone must be shorter than or equal to 10 characters':
            Notiflix.Notify.failure('Số điện thoại không được nhiều hơn 10');
            break;
          default:
            Notiflix.Notify.failure('Tạo tài khoản thất bại');
            break;
        }
      }
    } else {
      setErrManager(true)
    }

  };

  const handToggle = (isOpen) => {
    if (isOpen) {
      setIsDrop(true);
    } else {
      setIsDrop(false);
    }
  };

  const listRole = () => {
    // console.log(role.role);
    if (role.role === 'MANAGER' || role.role === "ACCOUNTANT") {
      return Object.values(ROLES).filter(item => {
        return item.value === "USER"
      })
    } else {
      return Object.values(ROLES)
    }
  }

  useEffect(() => {
    if (role.role === 'MANAGER' || role.role === "ACCOUNTANT") {
      const value = Object.values(ROLES).filter(item => {
        return item.value === "USER"
      })
      setSelectedRole(value[0])
    }
  }, [])

  // console.log(listRole());

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

       
        <button className={styles.btnSubmit} type="submit">
          Xác nhận
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalCreateUser;
