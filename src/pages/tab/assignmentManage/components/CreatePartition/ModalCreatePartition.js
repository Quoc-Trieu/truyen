import React, { useState, useEffect } from "react";
import styles from "./ModalCreatePartition.module.scss";
import iconSearch from "../../../../../assets/ico/icon-feather-search.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import HeaderFilter from './HeaderFilter/HeaderFilter';
import BodyAssignmentList from './BodyAssignmentList/BodyAssignmentList';
import FooterAssignment from './FooterAssignment/FooterAssignment';

const ModalCreatePartition = ({ visible, onCancel, onOk }) => {
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
    <ModalComponent
      title="TẠO PHÂN VÙNG CẠO MỚI"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={1500}
      alignHeader="left"
    >
        <HeaderFilter />
        <BodyAssignmentList />
        <FooterAssignment />
    </ModalComponent>
  );
};

export default ModalCreatePartition;
