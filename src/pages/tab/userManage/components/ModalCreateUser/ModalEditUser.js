import React, { useState, useEffect } from "react";
import styles from "./ModalCreateUser.module.scss";
import { Modal } from "antd";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import { postCreateUser, putChangePass } from "../../../../../services/userServies";
import { useSelector } from "react-redux";
import RadioButton from "./../../../../../components/RadioButton/RadioButton";
import { Notiflix } from "notiflix";
import { useDispatch } from "react-redux";
import {
  getALLInfoUser,
  roleUserSelector,
} from "../../../../../store/user/UserSlice";
import { Loading } from "notiflix";
import { putUpdateUser, getPassNoHas } from "./../../../../../services/userServies";

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
  const ROLE = { USER: "USER", MANAGE: "MANAGE" };
  const [selectedRole, setSelectedRole] = useState();
  const [passOld, setPassOld] = useState();
  const roleLogin = useSelector(roleUserSelector);


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

  const onSelectRole = (roleName) => {
    // chỉ các tài khoản có quyền USER và MANAGE bị thay đổi
    if (selectedRole == ROLE.MANAGE || selectedRole == ROLE.USER) {
      setSelectedRole(roleName);
    }
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
        {
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
                onClick={() => onSelectRole(ROLE.MANAGE)}
              >
                <RadioButton selected={selectedRole == ROLE.MANAGE} />
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

export default ModalEditUser;
