import React, { useState, useEffect } from "react";
import styles from "./ModalEditCreatePartition.module.scss";
import iconSearch from "../../../../../assets/ico/icon-feather-search.png";
import { useForm } from "react-hook-form";
import ModalComponent from "../../../../../components/ModalComponent/ModalComponent";
import HeaderFilter from './EditHeaderFilter/EditHeaderFilter';
import BodyAssignmentList from './BodyAssignmentList/EditBodyAssignmentList';
import FooterAssignment from './FooterAssignment/EditFooterAssignment';
import { resetSpacing } from "../../../../../store/assignment/AssignmentSlice";
import { useDispatch } from 'react-redux';

const ModalEditCreatePartition = ({ visible, onCancel, onOk, data }) => {
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
        <HeaderFilter data={data} />
        <BodyAssignmentList data={data}/>
        <FooterAssignment data={data} onCancel={() => {onCancel(); dispatch(resetSpacing([]))}}/>
    </ModalComponent>
  );
};

export default ModalEditCreatePartition;
