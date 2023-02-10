import React from 'react'
import styles from "./Map.module.scss";
import Header from "./../../../components/Header/Header";

const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <Header title="Bản đồ" name="Nguyễn Văn A" />
    </div>
  )
}

export default Map