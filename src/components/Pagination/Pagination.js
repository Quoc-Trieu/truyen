import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { CSSTransition, Transition  } from 'react-transition-group';

import iconPrev from "../../assets/ico/icon-feather-arrow-left-blue.png";
import iconNext from "../../assets/ico/icon-feather-arrow-right-blue.png";

const Pagination = ({ pageTotalNum = 1, initValue = 1, OnChangePage, align }) => {
  const [pageCurrent, setPageCurrent] = useState(initValue);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  useEffect (() => {
    setPageCurrent(initValue);
  }, [initValue])

  useEffect(() => {
    // disable Prev trang khi trang hiện tại là 1
    if (pageCurrent == 1) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }
    // disable Next trang khi trang hiện tại là trang cuối cùng(pageTotalNum)
    if (pageCurrent == pageTotalNum) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
    // chạy OnChangePage được truyền vào từ component cha khi pageCurrent thay đổi
    OnChangePage(pageCurrent);
  }, [pageCurrent, pageTotalNum]);

  const onPrev = () => {
    // xử lý khi click Prev Trang
    if (!disablePrev) {
      console.log("onPrev");
      setPageCurrent(pageCurrent - 1);
    }
  };

  const onNext = () => {
    // xử lý khi click Next Trang
    if (!disableNext) {
      console.log("onNext");
      setPageCurrent(pageCurrent + 1);
    }
  };

  return (
    <div className={styles.pagingItem} style={{justifyContent: align}}>
      <div
        className={styles.leftPrev}
        style={{ opacity: disablePrev ? 0.5 : 1 }}
      >
        <img src={iconPrev} onClick={onPrev} />
      </div>

      
      <div className={styles.centerContainer}>
        {/* render ra số trang dựa vào pageTotalNum */}
        {Array.from(Array(pageTotalNum).keys()).map((item, index) => {
          return (
            <PageItemRender
              key={index}
              item={item + 1}
              pageCurrent={pageCurrent}
              onClick={() => {
                setPageCurrent(item + 1);
                OnChangePage(item + 1);
              }}
              pageTotalNum={pageTotalNum}
            />
          );
        })}
      </div>

      <div
        className={styles.rightNext}
        style={{ opacity: disableNext ? 0.6 : 1 }}
      >
        <img src={iconNext} onClick={onNext} />
      </div>
    </div>
  );
};

export default Pagination;

export const PageItemRender = ({ pageCurrent, onClick, item, pageTotalNum }) => {
  // xử lý và cho phép các Item hiển thị trên Pagination
  if (pageTotalNum <= 5) {
    return <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />;
  } else {
    // trường hợp khi pageTotalNum > 5
    //dựa vào pageCurrent để xử lý
    switch (pageCurrent) {
      //trường hợp pageCurrent = 1
      case 1:
        if (item <= pageCurrent + 3 || item == pageTotalNum) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        if (item == pageCurrent + 4) {
          return (
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{"..."}</div>
          );
        }
        break;
      // truong hop pageCurrent = 2
      case 2:
        if (item <= pageCurrent + 2 || item == pageTotalNum) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        if (item == pageCurrent + 3) {
          return (
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{"..."}</div>
          );
        }
        break;
      // trường hợp pageCurrent = 3
      case 3:
        if (item <= pageCurrent + 1 || item == pageTotalNum) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        if (item == pageCurrent + 2) {
          return (
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{"..."}</div>
          );
        }
        break;
      // trường hợp pageCurrent = 4
      case 4:
        if (
          (item >= pageCurrent - 2 && item <= pageCurrent + 1) ||
          item == pageTotalNum
        ) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        if (item == pageCurrent + 2) {
          return (
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{"..."}</div>
          );
        }
        break;
      // trường hợp pageCurrent = pageTotalNum -1 (trang hiện tại là trang gần cuối) => xử lý render 3 item trước + 1 item là trang hiện tại + 1 item cuối cùng
      case pageTotalNum - 1:
        if (item >= pageCurrent - 3 && item <= pageCurrent + 1) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        break;
      // trường hợp pageCurrent = pageTotalNum(trang hiện tại là trang cuối) => xử lý render ra 5 item cuối cùng
      case pageTotalNum:
        if (item >= pageCurrent - 4 && item <= pageCurrent) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        break;
      default:
        if ( (item >= pageCurrent - 2 && item <= pageCurrent + 1) || item == pageTotalNum ) {
          return (
            <ItemPage item={item} pageCurrent={pageCurrent} onClick={onClick} />
          );
        }
        // render ra 1 item "..." giữa các item
        if (item == pageCurrent + 2) {
          return (
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{"..."}</div>
          );
        }
        break;
    }
  }
};

export const ItemPage = ({ pageCurrent, onClick, item }) => {
  // nếu item này == trang hiện tại thì hiển thị style active màu xanh, ngược lại thì hiển thị style bình thường
  const activeStyle = pageCurrent == item ? styles.pageNumActive : styles.pageNum;
  return (
    <div className={activeStyle} onClick={onClick}>
      <span>{item}</span>
    </div>
  );
};
