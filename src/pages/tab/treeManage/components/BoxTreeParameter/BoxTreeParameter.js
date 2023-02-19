import React, { useState, useEffect } from "react";
import styles from "./BoxTreeParameter.module.scss";
import { useSelector } from "react-redux";
import { infoALLTreeSelector } from './../../../../../store/tree/TreeSlice';

const BoxTreeParameter = () => {
  const renderStyles = {
    total: {
      name: "Tất cả cây",
      textColor: "#fff",
      BgColor: "#3A3A3A",
    },
    treeX: {
      name: "Cây cạo",
      textColor: "#31D100",
      BgColor: "#DBFFCF",
    },
    treeCD: {
      name: "Cây cụt đọt",
      textColor: "#43439F",
      BgColor: "#F6F4FF",
    },
    treeKM: {
      name: "Cây khô miệng",
      textColor: "#967B38",
      BgColor: "#FCF1D5",
    },
    treeK: {
      name: "Cây kém",
      textColor: "#FFC000",
      BgColor: "#FFFED4",
    },
    treeO: {
      name: "Cây trống, chết",
      textColor: "#FF2700",
      BgColor: "#FDF2F0",
    },
  };
  const allTree = useSelector(infoALLTreeSelector);

  return (
    <div className={styles.treeParameterList}>
      {Object.keys(renderStyles).map((item, index) => {
        console.log();
        return (
          <div
            key={index}
            className={styles.itemTree}
            style={{
              backgroundColor: renderStyles[item]?.BgColor,
              color: renderStyles[item]?.textColor,
            }}
          >
            <span className={styles.title}>{renderStyles[item].name}</span>
            <span className={styles.value}>{allTree[item]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BoxTreeParameter;
