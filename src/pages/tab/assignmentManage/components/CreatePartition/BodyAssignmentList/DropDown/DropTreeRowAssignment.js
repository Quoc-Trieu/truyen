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


const DropTreeRowAssignment = ({ label, styleCustom, }) => {
  const dispatch = useDispatch();
  const itemScaping = useSelector(itemScapingSelector);
  const [treeRow, setTreeRow] = useState();

  useEffect(() => {
    if (itemScaping?.land) {
      const getRow = async () => {
        const res = await getInfoLand({id: itemScaping?.land});
        setTreeRow(res.data[0]?.rowsFromLand);
        setItemScaping({ endTree: res.data[0]?.rowsFromLand.length });
        console.log(res.data[0] );
        console.log(itemScaping);
      }
      getRow();
    }
  }, [itemScaping]);

  const onClickItem = (itemHang) => {
    dispatch(setItemScaping({ row: itemHang?.name }));
    console.log("itemHang" + JSON.stringify(itemHang) );
  };
  return (
    <div className={styles.dropDownComponent} style={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{itemScaping.row ? ("Hàng số " + itemScaping.row.slice(itemScaping.row.length - 3, itemScaping.row.length)) : "Chọn hàng" }</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ padding: 0 }}
            className={styles.dropMenu_hang}
          >
            {treeRow && Object.values(treeRow).map((item, index) => {
              return (
                <Dropdown.Item onClick={() => onClickItem(item)} key={index} className={styles.item_hang}>
                  <span>Hàng số {item?.name.substring(item?.name.length -3)}</span>
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropTreeRowAssignment;
