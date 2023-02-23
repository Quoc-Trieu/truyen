import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { Modal } from "antd";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import { postCreateUser } from "../../../../../services/userServies";
import RadioButton from "./../../../../../components/RadioButton/RadioButton";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { getALLInfoUser } from "../../../../../store/user/UserSlice";
import { Loading } from "notiflix";
import { useSelector } from "react-redux";

const ModalCreateUser = ({ visible, onCancel, onOk }) => {
  const ROLE = { USER: "USER", MANAGER: "MANAGER" };
  const permisson = useSelector(state => state.user.role);
  const STATUS = { ACTIVE: "ACTIVE", INACTIVE: "INACTIVE" };
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
      fullName: "",
      role: ROLE.USER,
      status: STATUS.ACTIVE,
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
      Notiflix.Notify.success("Tạo tài khoản thành công");
    } catch (error) {
      Loading.remove();
      console.log(error);
      switch (error?.response?.data?.code) {
        case "PHONE_IS_EXIST": Notiflix.Notify.failure("Số điện thoại đã tồn tại"); break;
        default: Notiflix.Notify.failure("Tạo tài khoản thất bại"); break;
      }
    }
  };

  return (
    <ModalComponent
      title="Tạo Tài Khoản Mới"
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
          type="number"
          {...register("phone", {
            required: "Vui lòng không bỏ trống ô này",
            minLength: {
              value: 10,
              message: 'Nhập tối thiểu 10 số',
            },
          })}
        />
        {errors?.phone &&
          <p className={styles.errorText}>{errors?.phone?.message}</p>
        }

        <span className={styles.label}>Mật khẩu</span>
        <input
          placeholder="Nhập mật khẩu"
          className={styles.input}
          {...register("password", {
            required: "Vui lòng không bỏ trống ô này",
            minLength: {
              value: 6,
              message: 'Nhập dài hơn 6 ký tự',
            },
          })}
        />
        {errors?.password &&
          <p className={styles.errorText}>{errors?.password?.message}</p>
        }

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

        {
          permisson == 'ADMIN' ?
            <>
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
                  onClick={() => onSelectRole(ROLE.MANAGER)}
                >
                  <RadioButton
                    selected={selectedRole == ROLE.MANAGER}
                    value={selectedRole}
                  />
                  <span>Quản lý</span>
                </div>
              </div>
            </> : ''
        }

        <button className={styles.btnSubmit} type="submit">
          Xác nhận
        </button>
      </form>
    </ModalComponent>
  );
};

export default ModalCreateUser;
