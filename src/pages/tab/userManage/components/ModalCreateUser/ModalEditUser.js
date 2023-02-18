import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { Modal } from "antd";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import { postCreateUser } from "../../../../../services/userServies";
import { useSelector } from "react-redux";
import RadioButton from "./../../../../../components/RadioButton/RadioButton";
import { Notiflix } from "notiflix";
import { useDispatch } from "react-redux";
import { getALLInfoUser, userDetailsSelector } from "../../../../../store/user/UserSlice";
import { Loading } from "notiflix";
import { putUpdateUser } from './../../../../../services/userServies';

const ModalEditUser = ({ title, visible, onCancel, onOk }) => {
  const item = useSelector(userDetailsSelector);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const ROLE = { USER: "USER", MANAGE: "MANAGE" };
 
  const dispatch = useDispatch();

  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [selectedRole, setSelectedRole] = useState();

  useEffect(() => {
    setPhone(item?.phone);
    setPassword(item?.password);
    setFullName(item?.fullName);
    setSelectedRole(item?.role?.join());
  }, [visible])

  const onSelectRole = (roleName) => {
    //cập nhật giá trị cho selectedRole để render lại RadioButton
    setSelectedRole(roleName);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      Loading.pulse();
      const res = await putUpdateUser({
        fullName: fullName,
        phone: phone,
        role: selectedRole,
        status: "ACTIVE",
      });
      //reload lại danh sách user
      dispatch(getALLInfoUser());
      reset();
      onOk();
      Loading.remove();
    } catch (error) {
      Loading.remove();
      console.log(error);
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
          placeholder="Nhập sđt người dùng"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          
        />
        {errors?.phone?.type === "required" ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}

        <span className={styles.label}>Mật khẩu</span>
        <input
          placeholder="Nhập mật khẩu"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        {errors?.password?.type === "required" ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}

        <span className={styles.label}>Tên người dùng</span>
        <input
          placeholder="Nhập tên người dùng"
          className={styles.input}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
         
        />
        {errors?.fullName?.type === "required" ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}

        <span className={styles.label}>Phân quyền</span>
        <div className={styles.groupAuthorizationUser}>
          <div
            className={styles.radioGroup}
            onClick={() => onSelectRole(ROLE.USER)}
          >
            <RadioButton
              selected={selectedRole == ROLE.USER}
            />
            <span>User</span>
          </div>
          <div
            className={styles.radioGroup}
            onClick={() => onSelectRole(ROLE.MANAGE)}
          >
            <RadioButton
              selected={selectedRole == ROLE.MANAGE}
            />
            <span>Quản lý</span>
          </div>
        </div>

        <button className={styles.btnSubmit} type="submit">
          Xác nhận
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalEditUser;
