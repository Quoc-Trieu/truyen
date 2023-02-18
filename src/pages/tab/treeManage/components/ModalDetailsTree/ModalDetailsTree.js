import React, {useState} from "react";
import styles from "./ModalDetailsTree.module.scss";
import ModalComponent from './../../../../../components/ModalComponent/ModalComponent';
import RadioButton from './../../../../../components/RadioButton/RadioButton';
import { ButtonSimple } from './../../../../../components/Button/ButtonSimple';


const ModalDetailsTree = ({ visible, onCancel, onOk, data }) => {
  const [status, setStatus] = useState(data.status);
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
            <span className={styles.value}>{data.name}</span>
          </div>
          {/* cây số */}
          <div className={styles.item}>
            <span className={styles.label}>Cây số: </span>
            <span className={styles.value}>{data.name}</span>
          </div>
          {/* Hàng số */}
          <div className={styles.item}>
            <span className={styles.label}>Hàng số: </span>
            <span className={styles.value}>{data.name}</span>
          </div>
          {/* Lô số */}
          <div className={styles.item}>
            <span className={styles.label}>Lô số: </span>
            <span className={styles.value}>{data.name}</span>
          </div>
          {/* ghi chú */}
          <textarea placeholder="Ghi chú: " rows="5" className={styles.inputNote}>
            {data.note}
          </textarea>
        </div>


        {/* col phải Trạng thái cây */}
        <div className={styles.modalDetailRight}>
          {/* Title */}
          <span className={styles.titleStatusTree}>Cập nhập trạng thái cây</span>
          {/* cây cạo */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={true}/>
            <span className={styles.textStatus}>Cây cạo</span>
          </div>
          {/* cây cụt đọt */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={false}/>
            <span className={styles.textStatus}>Cây cụt đọt</span>
          </div>
          {/* cây khô miệng */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={false}/>
            <span className={styles.textStatus}>Cây khô miệng</span>
          </div>
          {/* cây kém */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={false}/>
            <span className={styles.textStatus}>Cây kém</span>
          </div>
          {/* cây trống, chết */}
          <div className={styles.selectStatusTree}>
            <RadioButton selected={false}/>
            <span className={styles.textStatus}>Cây trống, chết</span>
          </div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <ButtonSimple text="Cập nhập" styleCustom={{backgroundColor: '#00A2FF', color: '#fff',}} />
      </div>
      
    </ModalComponent>
  );
};

export default ModalDetailsTree;
