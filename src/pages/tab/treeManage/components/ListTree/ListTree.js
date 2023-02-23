import React, { useState, useEffect } from "react";
import styles from "./ListTree.module.scss";
import iconEdit from "../../../../../assets/ico/icon-feather-edit.png";
import ModalDetailsTree from "./../ModalDetailsTree/ModalDetailsTree";
import { useSelector } from "react-redux";
import Pagination from './../../../../../components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { getALLTrees, infoALLTreeSelector, pageCurrentTreeSelector, setPageCurrentTree } from './../../../../../store/tree/TreeSlice';

const STATUSTREE = {
  X: { name: "Cây cạo", color: "#31D100", borderColor: "#95FF74" },
  CD: { name: "Cụt đọt", color: "#43439F", borderColor: "#D2D2FF" },
  KM: { name: "Khô miệng", color: "#967B38", borderColor: "#E2D7BA" },
  K: { name: "Cây kém", color: "#FFC000", borderColor: "#FFDD75" },
  O: { name: "Cây chết", color: "#FF2700", borderColor: "#FFD7CF" },
};

const ListTree = () => {
  const dispatch = useDispatch();
  const allTree = useSelector(infoALLTreeSelector);
  const pageCurrentTree = useSelector(pageCurrentTreeSelector);

  const [showModal, setShowModal] = useState(false);
  const [itemTree, setItemTree] = useState();

  const onDetails = (item) => {
    console.log('item'+ JSON.stringify(item));
    setShowModal(true)
    setItemTree(item);
  };

  const SplitChuoi = (chuoi) => {
    let soLo = chuoi.substring(1, 3); // lấy 2 ký tự sau chữ S
    let soHang = chuoi.substring(4, 7); // lấy 3 ký tự sau chữ H
    let soCay = chuoi.substring(8, 11); // lấy 3 ký tự sau chữ C
  
    return {
      soLo: soLo,
      soHang: soHang,
      soCay: soCay
    };
  }

  const onChangePage = (page) => {
    dispatch(setPageCurrentTree(page))
    dispatch(getALLTrees())
  }

  return (
    <div className={styles.listTree}>
      <div className={styles.headerListTree}>
        <span>Lô</span>
        <span>Hàng</span>
        <span>Cây</span>
        <span>Trạng thái cây</span>
        <span></span>
      </div>

      <div className={styles.listContainer}>
        {/* Item row */}
        {allTree?.trees && allTree?.trees.map((item, index) => {
          return (
            <div className={styles.itemRow} key={index}>
              <span>Số lô {SplitChuoi(item?.name)?.soLo}</span>
              <span>Hàng số {SplitChuoi(item?.name)?.soHang}</span>
              <span>Cây số {SplitChuoi(item?.name)?.soCay}</span>
              <div className={styles.statusTree}>
                <div
                  className={styles.dotStatus}
                  style={{
                    backgroundColor: STATUSTREE?.[item?.status]?.color,
                    borderWidth: "3px",
                    borderColor: STATUSTREE?.[item?.status]?.borderColor,
                  }}
                ></div>
                <span className={styles.statusText}  style={{color: STATUSTREE?.[item?.status]?.color}}>{STATUSTREE?.[item?.status]?.name}</span>
              </div>
              <div className={styles.seeDetails}>
                <button
                  className={styles.btnSeeDetails}
                  onClick={() => onDetails(item)}
                >
                  <img src={iconEdit} />
                  <span>Chi tiết cây</span>
                </button>
              </div>
            </div>
          );
        })}

  </div>
  <Pagination
          align="flex-end"
          pageTotalNum={allTree?.totalPages}
          initValue={pageCurrentTree}
          OnChangePage={onChangePage}
        />    

      <ModalDetailsTree
                  visible={showModal}
                  data={itemTree}
                  onCancel={() => setShowModal(false)}
                  onOk={() => setShowModal(false)}
                />
    </div>
  );
};

export default ListTree;
