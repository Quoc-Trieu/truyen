import React, { useState, useEffect } from "react";
import styles from "./DropLotComponent.module.scss";
import iconUp from "../../assets/ico/icon-feather-chevron-up.png";
import iconDown from "../../assets/ico/icon-feather-chevron-down.png";
import Dropdown from "react-bootstrap/Dropdown";
import "./menuDrop.css";
import { getALLland } from '../../services/treeServices';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/tree/TreeSlice';
import { getALLTrees } from './../../store/tree/TreeSlice';

const DropLand = ({ label, styleCustom }) => {
  const [ land , setLand ] = useState([]);
  const dispatch = useDispatch();
  const [labelLand, setLabelLand] = useState(label);
  useEffect(() => {
    const getLand = async () => {
      const res = await getALLland();
      setLand(res.data);
      console.log(res.data);
      console.log(Object.values(res.data));
      
    }
    getLand();
  }, []);

  const onClickItem = (nameLo) => {
    console.log(nameLo);
    dispatch(setFilter({ land: nameLo }));
    setLabelLand('Lô số ' + nameLo);
  };

  const onUnselectLo = (e) => {
    console.log(e);
    dispatch(setFilter({ land: null, row: null, nameTree: null }));
    dispatch(getALLTrees({resetPage: true}));
  };

  
  return (
    <div className={styles.dropDownComponent} style={{background: "#fff", padding: '0px 10px', borderRadius: '2px', borderWidth: '1px', borderColor: '#707070'}}>
      <Dropdown drop="down" className="drop">
        <Dropdown.Toggle>
          <div className={styles.dropLotToggle}>
            <span>{labelLand}</span>
            <img src={iconUp} className={styles.iconDownEx} />
          </div>
        </Dropdown.Toggle>


          <Dropdown.Menu style={{ padding: 0 }} className="dropMenu_Lo">
            <span className="menu_Lo_subTitle">Chọn lô</span>
            <div className="menu_Lo_render_container">
              {land && Object.values(land).map((item, index) => {
                return (
                <div key={index} className="item_Lo_bg_round">
                  <Dropdown.Item className="item_Lo"  onClick={() => onClickItem(item?.name)}>
                    <span>{item?.name.substring(item?.name.length - 2)}</span>
                  </Dropdown.Item>
                </div>
                )
              })}
            </div>
            <button className="btn_bo_chon_Lo" onClick={onUnselectLo}>
              <Dropdown.Item>Bỏ Chọn</Dropdown.Item>
            </button>
          </Dropdown.Menu>
       
      </Dropdown>
    </div>
  );
};

export default DropLand;
