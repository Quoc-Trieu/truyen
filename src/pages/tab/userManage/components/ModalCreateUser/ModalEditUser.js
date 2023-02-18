import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { Modal } from "antd";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import { postCreateUser } from "../../../../../services/userServies";
import RadioButton from "./../../../../../components/RadioButton/RadioButton";
import { Notiflix } from "notiflix";
import { useDispatch } from "react-redux";
import { getALLInfoUser } from "../../../../../store/user/UserSlice";
import { Loading } from "notiflix";

const ModalEditUser = ({ title, visible, onCancel, onOk, item }) => {
  const ROLE = { USER: "USER", MANAGE: "MANAGE" };
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: item?.phone,
      password: item?.password,
      fullName: item?.fullName,
      role: item?.role[0],
    },
  });
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(ROLE.USER);

  const onSelectRole = (roleName) => {
    //cập nhật giá trị cho selectedRole để render lại RadioButton
    setSelectedRole(roleName);
    //setValue để lưu giá trị vào hook form
    setValue("role", roleName);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      Loading.pulse();
      const res = await postCreateUser(data);
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
          {...register("phone", {
            required: true,
          })}
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
          {...register("password", {
            required: true,
          })}
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
          {...register("fullName", {
            required: true,
          })}
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
              value={selectedRole}
            />
            <span>User</span>
          </div>
          <div
            className={styles.radioGroup}
            onClick={() => onSelectRole(ROLE.MANAGE)}
          >
            <RadioButton
              selected={selectedRole == ROLE.MANAGE}
              value={selectedRole}
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
