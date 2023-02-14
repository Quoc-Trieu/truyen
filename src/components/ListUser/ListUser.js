import React, { useState } from "react";
import styles from "./ListUser.module.scss";
import iconEdit from "../../assets/ico/icon-feather-edit.png";
import iconRemove from "../../assets/ico/icon-remove.png";
import iconLock from "../../assets/ico/icon-ionic-lock.png";
import iconUnLock from "../../assets/ico/icon-ionic-unlock.png";
import iconDown from "../../assets/ico/icon-awesome-caret-down.png";
import Dropdown from "react-bootstrap/Dropdown";

const ListUser = ({
  itemsHeaderRow,
  itemUser,
}) => {
  const onEdit = () => {
    console.log("onEdit");
  };

  const onRemove = () => {
    console.log("onRemove");
  };

  const onLock = () => {
    console.log("onLock");
  };

  const onChangeLock = () => {
    console.log("onChangeLock");
  };

  return (
    <div className={styles.listUser}>
      {/* Header row */}
      <div className={styles.headerRow}>
        {itemsHeaderRow.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>

      {/* Item row */}
      <div className={styles.itemContainer}>
        {itemUser.map((item, index) => {
          // kiểm tra trạng thái của user có bị khóa hay không, nếu bị khóa thì trả về true, ngược lại trả về false
          const isUserLocked = item?.status == true ? true : false;
          const getIconUserLocked = item?.status == true ? iconLock : iconUnLock;

          return (
            <div key={index} className={styles.itemUI}>
              <span>{item?.phone} </span>
              <span>{item?.name} </span>
              <div className={styles.actionItem}>
                <img src={iconEdit} className={styles.edit} onClick={onEdit} />
                <img
                  src={iconRemove}
                  className={styles.remove}
                  onClick={onRemove}
                />

                <Dropdown style={{height :'100%'}}>
                  <Dropdown.Toggle style={{height :'100%'}}>
                    <div className={styles.lockUser} onClick={onLock}>
                      <img
                        src={getIconUserLocked}
                        className={styles.iconLock}
                      />
                      <img src={iconDown} className={styles.iconDown} />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ padding: 0 }} align='end'>
                    <Dropdown.Item
                      className={styles.lockDropdown}
                      onClick={onChangeLock}
                      style={
                        isUserLocked == true
                          ? { background: "#00D673" }
                          : { background: "#FF3B3B" }
                      }
                    >
                      <span className={styles.textDropLock}>
                        {item?.status == true ? "Mở khóa" : "Khóa"}
                      </span>
                      <img
                        className={styles.iconDropLock}
                        src={isUserLocked == true ? iconUnLock : iconLock}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListUser;
