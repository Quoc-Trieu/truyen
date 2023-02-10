import React, { useState, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";

import logo from "../../assets/images/image-login.png";
import iconUser from "../../assets/ico/icon-awesome-user.png";
import iconKey from "../../assets/ico/icon-feather-key.png";
import iconEye from "../../assets/ico/icon-awesome-eye.png";
import iconEyeOff from "../../assets/ico/icon-awesome-eye-slash.png";

const Login = () => {
  const VN = "+84";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div id={styles.loginPage}>
      <div className={styles.logoLoginContainer}>
        <img className={styles.logoLogin} src={logo} />
      </div>
      <form className={styles.wrapLogin} onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Đăng nhập</span>
        <div className={styles.inputBox}>
          <img className={styles.iconUserStyle} src={iconUser} />
          <input
            placeholder="Tài khoản"
            className={styles.inputAccount}
            {...register("account", {
              required: true,
            })}
          />
        </div>
        {errors?.account?.type === "required" ? (
          <p className={styles.errorText}>Vui lòng không bỏ trống ô này</p>
        ) : (
          <p className={styles.errorText}> </p>
        )}

        <div className={styles.inputBox}>
          <img className={styles.iconKeyStyle} src={iconKey} />
          <input
            placeholder="Mật khẩu"
            type={isShowPassword ? "text" : "password"}
            className={styles.inputPassword}
            {...register("password", {
              required: true,
            })}
          />
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

export default Login
