import React from "react";
import styles from "./Assignment.module.scss";
import Header from "./../../../components/Header/Header";
import SearchInput from "./../../../components/SearchInput/SearchInput";
import Button from "./../../../components/Button/Button";
import Pagination from "./../../../components/Pagination/Pagination";
import { useState } from "react";
import ListAssginment from "./components/ListAssignment/ListAssignment";
import CreatePartitionModal from "./components/CreatePartition/CreatePartitionModal";

export const assignmenList = [
  {
    shaverArea: { name: "Vùng số 1", time: "00/00/2000" },
    userShaver: { user: "Nguyễn văn Bảy", phone: "0123456789" },
    LotNumShaver: 2,
    LotTreeShaver: 3,
    TotalTreeShaver: 15,
  },
  {
    shaverArea: { name: "Vùng số 2", time: "00/00/2000" },
    userShaver: { user: "Nguyễn văn Bảy", phone: "0123456789" },
    LotNumShaver: 2,
    LotTreeShaver: 3,
    TotalTreeShaver: 15,
  },
  {
    shaverArea: { name: "Vùng số 3", time: "00/00/2000" },
    userShaver: { user: "Nguyễn văn Bảy", phone: "0123456789" },
    LotNumShaver: 2,
    LotTreeShaver: 3,
    TotalTreeShaver: 15,
  },
  {
    shaverArea: { name: "Vùng số 4", time: "00/00/2000" },
    userShaver: { user: "Nguyễn văn Bảy", phone: "0123456789" },
    LotNumShaver: 2,
    LotTreeShaver: 3,
    TotalTreeShaver: 15,
  },
];

const Assignment = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className={styles.assignmentContainer}>
      <Header title="Quản lý công việc" name="Nguyễn Văn A" />
      <div className={styles.assignmentBody}>
        <div className={styles.toolbar}>
          <SearchInput
            placeholder="Nhập vùng cạo"
            onSubmit={(searchText) => console.log(searchText)}
          />
          <Button
            text="Tạo phân vùng mới"
            onSubmit={() => {
              setShowModal(true);
              console.log(showModal);
            }}
          />
        </div>

        <ListAssginment
          itemsHeaderRow={[
            "Vùng cạo",
            "Người cạo",
            "Số lô cạo",
            "Số hàng cạo",
            "Tổng cây cạo",
            "",
          ]}
          assignmenList={assignmenList}
        />

        <Pagination
          align="flex-end"
          OnChangePage={(text) => {
            console.log(text);
          }}
        />

        <CreatePartitionModal isShow={showModal} onCancel={() => setShowModal(false)}/>
      </div>
    </div>
  );
};

export default Assignment;
