import React from 'react'
import styles from "./Assignment.module.scss";
import Header from "./../../../components/Header/Header";

const Assignment = () => {
  return (
    <div className={styles.assignmentContainer}>
      <Header title="Quản lý công việc" name="Nguyễn Văn A" />
    </div>
  )
}

export default Assignment