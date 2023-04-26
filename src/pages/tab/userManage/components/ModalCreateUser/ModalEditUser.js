import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { Modal } from "antd";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import { getALLUser, postCreateUser, putChangePass } from "../../../../../services/userServies";
import { useSelector } from "react-redux";
import RadioButton from "./../../../../../components/RadioButton/RadioButton";
import  Notiflix  from "notiflix";
import { useDispatch } from "react-redux";
import {
  getALLInfoUser,
} from "../../../../../store/user/UserSlice";
import {
  roleUserSelector,
} from "../../../../../store/auth/authSlice";
import { Loading } from "notiflix";
import { putUpdateUser, getPassNoHas } from "./../../../../../services/userServies";
import Dropdown from 'react-bootstrap/Dropdown';
import iconUp from './../../../../../assets/ico/icon-feather-chevron-up.png';
import iconDown from './../../../../../assets/ico/icon-feather-chevron-down.png';
import ROLES from './../../../../../constants/roles';

const ModalEditUser = ({ title, visible, onCancel, onOk, item }) => {
  // console.log('itemSelect----------' + JSON.stringify(item));
  const permisson = useSelector(state => state.user.role)
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState();
  const [passOld, setPassOld] = useState();
  const [isDrop, setIsDrop] = useState(false);
  const roleLogin = useSelector(roleUserSelector);

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

  useEffect(() => {
    setValue("phone", item?.phone);
    setValue("fullName", item?.fullName);
    setSelectedRole(item?.role?.join());
    // console.log(selectedRole);

    const getPass = async () => {
      try {
        const res = await getPassNoHas(item?.phone);
        // lưu pass cũ lại và khởi tạo giá trị pass mới vào hook form
        setPassOld(String(res?.data));
        setValue("password", String(res?.data));
      } catch (error) {
        console.log("getPassNoHas mật khẩu" + error);
      }
    };
    getPass();

  }, [visible]);


  // const onSelectRole = (roleName) => {
  //   // chỉ các tài khoản có quyền USER và MANAGER bị thay đổi
  //   if (selectedRole == ROLE.MANAGER || selectedRole == ROLE.USER) {
  //     setSelectedRole(roleName);
  //   }
  // };

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
    setValue('userManager', item?.phone);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      Loading.pulse();
      const resUpdate = await putUpdateUser({
        phone: item?.phone,
        data: {
          fullName: data?.fullName,
          phone: data?.phone,
          role: selectedRole,
          status: item?.status,
        },
      });
      //nếu password thay đổi thì gọi api changePass
      if (item?.password !== data?.password) {
        const resChangePass = await putChangePass({
          phone: data?.phone,
          data: {
            oldPassword: passOld,
            newPassword: data?.password,
            role: roleLogin,
          },
        });
      }
      //reload lại danh sách user
      dispatch(getALLInfoUser());
      reset();
      onOk();
      Notiflix.Notify.success("Cập nhật thành công");
      Loading.remove();
    } catch (error) {
      Notiflix.Notify.failure("Cập nhật thất bại");
      Loading.remove();
      console.log(error);
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
      title={title}
      visible={visible}
      // onOk={onOk}
      onCancel={onCancel}
      width={500}
      styleWrapper={{ backgroundColor: "#fff" }}
    >
      <form className={styles.modalWrapper} onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.label}>Tài khoản</span>
        <input
          readOnly={true}
          type="text"
          placeholder="Nhập sđt người dùng"
          className={styles.input}
          {...register("phone", {
            required: "Vui lòng không bỏ trống ô này",
            readOnly: true,
            minLength: {
              value: 6,
              message: "Nhập dài hơn 6 ký tự",
            },
          })}
        />
        {errors?.phone && (
          <p className={styles.errorText}>{errors?.phone?.message}</p>
        )}

        <span className={styles.label}>Mật khẩu</span>
        <input
          type="text"
          placeholder="Nhập mật khẩu"
          className={styles.input}
          {...register("password", {
            required: "Vui lòng không bỏ trống ô này",
            minLength: {
              value: 6,
              message: "Nhập dài hơn 6 ký tự",
            },
          })}
        />
        {errors?.password && (
          <p className={styles.errorText}>{errors?.password?.message}</p>
        )}

        <span className={styles.label}>Tên người dùng</span>
        <input
          type="text"
          placeholder="Nhập tên người dùng"
          className={styles.input}
          {...register("fullName", {
            required: "Vui lòng không bỏ trống ô này",
          })}
        />
        {errors?.fullName && (
          <p className={styles.errorText}>{errors?.fullName?.message}</p>
        )}
        {/* {
          permisson == 'ADMIN' ? <>
            <span className={styles.label}>Phân quyền</span>
            <div className={styles.groupAuthorizationUser}>
              <div
                className={styles.radioGroup}
                onClick={() => onSelectRole(ROLE.USER)}
              >
                <RadioButton selected={selectedRole == ROLE.USER} />
                <span>User</span>
              </div>
              <div
                className={styles.radioGroup}
                onClick={() => onSelectRole(ROLE.MANAGER)}
              >
                <RadioButton selected={selectedRole == ROLE.MANAGER} />
                <span>Quản lý</span>
              </div>
            </div>
          </> : ''
        } */}
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

export default ModalEditUser;
