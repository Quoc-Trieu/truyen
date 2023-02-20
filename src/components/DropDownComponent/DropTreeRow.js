import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";
import { useDispatch } from 'react-redux';
import { filterTreeSelector, setFilter } from "../../store/tree/TreeSlice";
import { useSelector } from 'react-redux';
import { getInfoLand } from "../../services/treeServices";
import { getALLTrees } from './../../store/tree/TreeSlice';

const TREES = {
  ALL: { name: "Tất cả cây", type: null, color: "#707070" },
  X: { name: "Cây cạo", type: "X", color: "#31D100" },
  CD: { name: "Cụt đọt", type: "CD", color: "#43439F" },
  KM: { name: "Khô miệng", type: "KM", color: "#967B38" },
  K: { name: "Cây kém", type: "K", color: "#FFC000" },
  O: { name: "Cây chết", type: "O", color: "#FF2700" },
};

const DropTreeRow = ({ label, styleCustom, }) => {
  const dispatch = useDispatch();
  const filterTree = useSelector(filterTreeSelector);
  const [treeRow, setTreeRow] = useState();

  useEffect(() => {
    if (filterTree?.land) {
      const getRow = async () => {
        const res = await getInfoLand({id: filterTree?.land});
        setTreeRow(res.data[0]?.rowsFromLand);
      }
      getRow();
    }
  }, [filterTree]);

  const onClickItem = (itemHang) => {
    dispatch(setFilter({ row: itemHang?.name }));
    dispatch(getALLTrees({resetPage: true}));
  };
  return (
    <div className={styles.dropDownComponent} style={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{filterTree.row ? ("Hàng số " + filterTree.row.slice(filterTree.row.length - 3, filterTree.row.length)) : "Chọn hàng" }</span>
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

export default DropTreeRow;
