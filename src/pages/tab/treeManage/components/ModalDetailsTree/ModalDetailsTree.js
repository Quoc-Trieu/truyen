import React, {useState} from "react";
import styles from "./ModalDetailsTree.module.scss";
import ModalComponent from './../../../../../components/ModalComponent/ModalComponent';
import RadioButton from './../../../../../components/RadioButton/RadioButton';
import { ButtonSimple } from './../../../../../components/Button/ButtonSimple';


const ModalDetailsTree = ({ visible, onCancel, onOk, data }) => {
  const STATUSTREE = { X: "X", CD: "CD", KM: "KM", K: "K", O: "O" };
  const [status, setStatus] = useState(data?.status);
  const [note, setNote] = useState(data?.note);
  console.log(data);
  


  const SplitChuoi = (chuoi) => {
    if(chuoi){
      let soLo = chuoi.substring(1, 3); // lấy 2 ký tự sau chữ S
      let soHang = chuoi.substring(4, 7); // lấy 3 ký tự sau chữ H
      let soCay = chuoi.substring(9, 11); // lấy 3 ký tự sau chữ C
    
      return {
        soLo: soLo,
        soHang: soHang,
        soCay: soCay
      };
    }
  }

  const onUpdate = () => {
    console.log(status, note);
  }

  return (
    <ModalComponent
      title="Chi tiết cây"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
      styleWrapper={{backgroundColor: "#fff"}}
    >
      <div className={styles.modalDetailsTree}>
        {/* col trái */}
        <div className={styles.modalDetailLeft}>
          {/* Mã cây */}
          <div className={styles.item}>
            <span className={styles.label}>Mã cây: </span>
            <span className={styles.value}>{data?.rowId}</span>
          </div>
          {/* cây số */}
          <div className={styles.item}>
            <span className={styles.label}>Cây số: </span>
            <span className={styles.value}>{SplitChuoi(data?.name)?.soLo}</span>
          </div>
          {/* Hàng số */}
          <div className={styles.item}>
            <span className={styles.label}>Hàng số: </span>
            <span className={styles.value}>{SplitChuoi(data?.name)?.soHang}</span>
          </div>
          {/* Lô số */}
          <div className={styles.item}>
            <span className={styles.label}>Lô số: </span>
            <span className={styles.value}>{SplitChuoi(data?.name)?.soCay}</span>
          </div>
          {/* ghi chú */}
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Ghi chú: " rows="5" className={styles.inputNote}>
          </textarea>
        </div>


        {/* col phải Trạng thái cây */}
        <div className={styles.modalDetailRight}>
          {/* Title */}
          <span className={styles.titleStatusTree}>Cập nhập trạng thái cây</span>
          {/* cây cạo */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={status == STATUSTREE.X}/>
            <span className={styles.textStatus}>Cây cạo</span>
          </div>
          {/* cây cụt đọt */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={status == STATUSTREE.CD}/>
            <span className={styles.textStatus}>Cây cụt đọt</span>
          </div>
          {/* cây khô miệng */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={status == STATUSTREE.KM}/>
            <span className={styles.textStatus}>Cây khô miệng</span>
          </div>
          {/* cây kém */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={status == STATUSTREE.K}/>
            <span className={styles.textStatus}>Cây kém</span>
          </div>
          {/* cây trống, chết */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={status == STATUSTREE.O}/>
            <span className={styles.textStatus}>Cây trống, chết</span>
          </div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <ButtonSimple text="Cập nhập" styleCustom={{backgroundColor: '#00A2FF', color: '#fff',}} onSummit={onUpdate}/>
      </div>
      
    </ModalComponent>
  );
};

export default ModalDetailsTree;
