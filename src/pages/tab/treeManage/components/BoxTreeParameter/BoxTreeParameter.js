import React, { useState, useEffect } from "react";
import styles from "./BoxTreeParameter.module.scss";

const BoxTreeParameter = () => {
  const dataTree = [
    {
      name: "Tất cả cây",
      textColor: "#fff",
      BgColor: "#3A3A3A",
    },
    {
      name: "Cây cạo",
      textColor: "#31D100",
      BgColor: "#DBFFCF",
    },
    {
      name: "Cây cụt đọt",
      textColor: "#43439F",
      BgColor: "#F6F4FF",
    },
    {
      name: "Cây khô miệng",
      textColor: "#967B38",
      BgColor: "#FCF1D5",
    },
    {
      name: "Cây kém",
      textColor: "#FFC000",
      BgColor: "#FFFED4",
    },
    {
      name: "Cây trống, chết",
      textColor: "#FF2700",
      BgColor: "#FDF2F0",
    },
  ];
  return (
    <div className={styles.treeParameterList}>
      {dataTree.map((item, index) => {
        return (
          <div key={index} className={styles.itemTree} style={{backgroundColor: item?.BgColor, color: item?.textColor }}>
            <span className={styles.title}>{item.name}</span>
            <span className={styles.value}>2000</span>
          </div>
        );
      })}
    </div>
  );
};

export default BoxTreeParameter;
