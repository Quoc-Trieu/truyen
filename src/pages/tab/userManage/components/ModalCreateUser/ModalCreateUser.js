import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { Modal } from "antd";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from '../../../../../components/ModalComponent/ModalComponent';
import { postCreateUser } from "../../../../../services/userServies";

const ModalCreateUser = ({ visible, onCancel, onOk }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await postCreateUser(data);
      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
    
  };
  
  return (
    <ModalComponent
      title="Tạo Tài Khoản Mới"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={500}
      styleWrapper={{backgroundColor: "#fff"}}
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

        <button className={styles.btnSubmit} type="submit">
          Xác nhận
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalCreateUser;
