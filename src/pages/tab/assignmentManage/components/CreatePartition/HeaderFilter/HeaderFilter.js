import React, { useState, useEffect } from "react";
import styles from "./HeaderFilter.module.scss";
import iconSearch from "../../../../../../assets/ico/icon-feather-search.png";
import { useForm } from "react-hook-form";

const HeaderFilter = () => {
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
        <form className={styles.HeaderFilter} onSubmit={handleSubmit(onSubmit)}>
          {/* Người giao */}
          <div className={styles.deliver}>
            <div className={styles.labelDeliver}>
              <div className={styles.circle}></div>
              <span>Người giao</span>
            </div>
            <input
              readOnly={true}
              placeholder="Admin Tuấn"
              className={styles.inputDeliver}
            />
          </div>

          {/* Người thực hiện */}
          <div className={styles.performer}>
            <div className={styles.labelPerformer}>
              <div className={styles.circle}></div>
              <span>Người thực hiện</span>
            </div>
            <div className={styles.inputPerformerContainer}>
              <input
                placeholder="Nhập tên người thực hiện"
                className={styles.inputPerformer}
                {...register("inputPerformer")}
              />
              <button className={styles.btnPerformer}>
                <img src={iconSearch} />
              </button>
            </div>
          </div>

          {/* Tên vùng cạo */}
          <div className={styles.shavingArea}>
            <div className={styles.labelShavingArea}>
              <div className={styles.circle}></div>
              <span>Tên vùng cạo</span>
            </div>
            <input
              placeholder="Nhập tên vùng cạo"
              className={styles.inputShavingArea}
              {...register("inputShavingArea")}
            />
          </div>
        </form>
  );
};

export default HeaderFilter;
