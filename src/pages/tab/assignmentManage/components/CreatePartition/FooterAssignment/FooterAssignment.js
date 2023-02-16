import React, { useState, useEffect } from "react";
import styles from "./FooterAssignment.module.scss";
import ButtonSimple from './../../../../../../components/Button/ButtonSimple';


const FooterAssignment = () => {
 
  return (
    <div className={styles.footerAssignment}>
        <ButtonSimple bold text="Hủy" />
        <ButtonSimple bold text="Xác nhận" styleCustom={{background: 'linear-gradient(90deg, #6AB100 0%, #85E000 100%)'}}/>
        
    </div>
  );
};

export default FooterAssignment;
