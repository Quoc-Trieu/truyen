import React, { useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";
import { useForm } from 'react-hook-form';

const RadioButton = ({ selected = true, onPress }) => {
  const { register, handleSubmit } = useForm();
  return (
    <div onClick={onPress} className={styles.container}>
        {selected && <div className={styles.circle}/>}
    </div>
   
  );
};

export default RadioButton;