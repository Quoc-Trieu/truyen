import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import {
  postCreateUser,
  putChangePass,
} from "../../../../../services/userServies";
import { Notiflix } from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  getALLInfoUser,
  userInfoSelector,
} from "../../../../../store/user/UserSlice";
import { Loading } from "notiflix";

const ModalChangePassword = ({ visible, onCancel, onOk }) => {
  const userInfo = useSelector(userInfoSelector);
  // console.log("visible", userInfo);
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setValue("role", userInfo?.role[0]);
  // }, [visible]);

  const onSubmit = async (data) => {
    // thêm role vào data trước khi gửi lên server
    data.role = userInfo?.role[0];
    console.log("ModalChangePassword Submit: ", data, "----phone:", userInfo?.phone);
    try {
      Loading.pulse();
      const res = await putChangePass({ phone: userInfo?.phone, data: data });
      // đóng modal và reset form data
      onOk();
      reset();
      Loading.remove();
    } catch (error) {
      Loading.remove();
      //bắt lỗi từ server trả về
      switch (error?.response?.data?.response?.message[0]) {
        case "oldPassword must be longer than or equal to 6 characters":
          setError("oldPassword", { type: "WrongPassword", message: "Mật Khẩu cũ phải hơn 6 ký tự", });
          break;

        case "newPassword must be longer than or equal to 6 characters":
          setError("newPassword", { type: "WrongPassword", message: "Mật Khẩu mới phải hơn 6 ký tự", });
          break;

        default:
          setError("oldPassword", { type: "WrongPassword", message: error?.response?.data?.response?.message[0], });
          break;
      }
    }
  };

  return (
    <ModalComponent
      title="Đổi Mật Khẩu"
      visible={visible}
      // onOk={onOk}
      onCancel={onCancel}
      width={500}
      styleWrapper={{ backgroundColor: "#fff" }}
    >
      <form className={styles.modalWrapper} onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.label}>Mật khẩu cũ</span>
        <input
          placeholder="Mật khẩu cũ"
          className={styles.input}
          {...register("oldPassword", {
            required: "Vui lòng không bỏ trống ô này",
            minLength: {
              value: 6,
              message: 'Nhập dài hơn 6 ký tự',
            },
          })}
        />
        {/* bắt lỗi từ server trả về và lỗi để trống */}
        {errors?.oldPassword && (
          <span className={styles.errorText}>{errors.oldPassword.message}</span>
        )}

        <span className={styles.label}>Mật khẩu mới</span>
        <input
          placeholder="Mật khẩu mới"
          className={styles.input}
          {...register("newPassword", {
            required: "Vui lòng không bỏ trống ô này",
            minLength: {
              value: 6,
              message: 'Nhập dài hơn 6 ký tự',
            },
          })}
        />
        {/* bắt lỗi từ server trả về và lỗi để trống */}
        {errors?.newPassword && (
          <span className={styles.errorText}>{errors.newPassword.message}</span>
        )}

        <button className={styles.btnSubmit} type="submit">
          Lưu
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalChangePassword;
