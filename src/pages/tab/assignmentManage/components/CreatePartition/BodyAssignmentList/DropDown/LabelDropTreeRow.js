import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../../../../../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../../../../../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";
import { useDispatch } from 'react-redux';
import { getNumTreeAssignment, setItemScaping } from "../../../../../../../store/assignment/AssignmentSlice";
import { useSelector } from 'react-redux';
import { getInfoLand } from "../../../../../../../services/treeServices";
import { itemScapingSelector } from "../../../../../../../store/assignment/AssignmentSlice";
import { getALLUserAutoComplete, getTreeAssignment } from './../../../../../../../store/assignment/AssignmentSlice';


const LabelDropTreeRow = ({ label, styleCustom, }) => {
  return (
    <div className={styles.dropDownComponent} style={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{"Hàng số " + label}</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>
         
      </Dropdown>
    </div>
  );
};

export default LabelDropTreeRow;
