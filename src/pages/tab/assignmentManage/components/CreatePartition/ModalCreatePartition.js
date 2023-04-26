import React, { useState, useEffect } from "react";
import styles from "./ModalCreatePartition.module.scss";
import iconSearch from "../../../../../assets/ico/icon-feather-search.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import HeaderFilter from './HeaderFilter/HeaderFilter';
import BodyAssignmentList from './BodyAssignmentList/BodyAssignmentList';
import FooterAssignment from './FooterAssignment/FooterAssignment';
import { resetSpacing } from "../../../../../store/assignment/AssignmentSlice";
import { useDispatch } from 'react-redux';

const ModalCreatePartition = ({ visible, onCancel, onOk, subDivision }) => {
  const dispatch = useDispatch();
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
      onCancel={() => {onCancel(); dispatch(resetSpacing([]))}}
      width={1500}
      alignHeader="left"
      styleHeader={{padding: "3px 20px"}}
    >
        <HeaderFilter />
        <BodyAssignmentList />
        <FooterAssignment subDivision={subDivision} onCancel={() => {onCancel(); dispatch(resetSpacing([]))}}/>
    </ModalComponent>
  );
};

export default ModalCreatePartition;
