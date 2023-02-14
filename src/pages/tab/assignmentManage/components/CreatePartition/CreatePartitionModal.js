import React, { useState, useEffect } from "react";
import styles from "./CreatePartitionModal.module.scss";
// import iconClose from "../../../../../assets/images/iconClose.png";
import { useForm } from "react-hook-form";
import ModalComponent from '../../../../../components/ModalComponent/ModalComponent';

const CreatePartitionModal = ({ isShow, onCancel, onOk }) => {
  const [isShowing, setIsShowing] = useState(isShow);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log("isShow", isShow);
  return (
    <ModalComponent
      centered={true}
      visible={isShow}
      onOk={onOk}
      onCancel={onCancel}
      width={1000}
    >
    </ModalComponent>
  );
};

export default CreatePartitionModal;
