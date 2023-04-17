import React, { useState, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import logo from "../../assets/images/image-login.png";
import iconUser from "../../assets/ico/icon-awesome-user.png";
import iconKey from "../../assets/ico/icon-feather-key.png";
import iconEye from "../../assets/ico/icon-awesome-eye.png";
import iconEyeOff from "../../assets/ico/icon-awesome-eye-slash.png";
import { login } from "./../../services/authServices";
import { setPhoneLocalStorage, setToken } from "./../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import Notiflix from 'notiflix';
import { getInfoUser } from './../../store/auth/authSlice';
import { Loading } from 'notiflix';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      Loading.pulse()
      const res = await login(data);
      if (res?.data?.user?.status=="ACTIVE")
      {
        // lưu token và sdt vào localstorage
        setToken(res?.data?.auth);
        setPhoneLocalStorage(res?.data?.user?.phone);
        // lưu sdt vào redux và lấy thông tin user
        dispatch(getInfoUser(res?.data?.user?.phone))
        //thông báo và chuyền màn hình đăng nhập thành công
        navigate("/");
        Notiflix.Notify.success('Đăng nhập thành công');
      }else {
        Notiflix.Notify.failure('Tài khoản bị khóa');
      }
      Loading.remove();
    } catch (error) {
      Loading.remove();
      switch (error?.response?.data?.code) {
        case "USER_NOT_FOUND": Notiflix.Notify.failure('Tài khoản không tồn tại'); break;
        case "USERNAME_WRONG": Notiflix.Notify.failure('Tài khoản không tồn tại'); break;
        case "PASSWORD_WRONG": Notiflix.Notify.failure('Mật khẩu không đúng'); break;
        case "INVALID_STATUS": Notiflix.Notify.failure('Tài khoản bị khóa'); break;
        default: Notiflix.Notify.failure('Đăng nhập thất bại'); break;
      }

    }
  };

  return (
    <div id={styles.loginPage}>
      <div className={styles.logoLoginContainer}>
        <img className={styles.logoLogin} src={logo} />
      </div>
      <form className={styles.wrapLogin} onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Đăng nhập</span>
        {/* Tài khoản (sdt) */}
        <div className={styles.inputBox}>
          <img className={styles.iconUserStyle} src={iconUser} />
          <input
            placeholder="Tài khoản"
            className={styles.inputAccount}
            {...register("phoneNumber", {
              required: true,
            })}
          />
        </div>
        {errors?.phoneNumber?.type === "required" ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}
        {/* Mật khẩu */}
        <div className={styles.inpuPasstBox}>
          <img className={styles.iconKeyStyle} src={iconKey} />
          <input
            placeholder="Mật khẩu"
            type={isShowPassword ? "text" : "password"}
            className={styles.inputPassword}
            {...register("password", {
              required: true,
            })}
          />

          {/* xử lý icon mở và đóng mật khẩu */}
          {isShowPassword ? (
            <img
              className={styles.iconEyeStyle}
              src={iconEye}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          ) : (
            <img
              className={styles.iconEyeStyle}
              src={iconEyeOff}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          )}
        </div>
        {errors?.password?.type === "required" ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}

        <button className={styles.btnSubmit} type="submit">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default Login;
