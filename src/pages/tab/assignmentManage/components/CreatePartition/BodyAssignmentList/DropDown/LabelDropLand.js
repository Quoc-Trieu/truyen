import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../../../../../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../../../../../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";
import { getALLland } from '../../../../../../../services/treeServices';
import { useDispatch, useSelector } from 'react-redux';
import { setItemScaping } from '../../../../../../../store/assignment/AssignmentSlice';
import { itemScapingSelector } from "../../../../../../../store/assignment/AssignmentSlice";

const LabelDropLand = ({ label, styleCustom }) => {
  return (
    <div className={styles.dropDownComponent} style={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{"Lô số " + label} </span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
};

export default LabelDropLand;
