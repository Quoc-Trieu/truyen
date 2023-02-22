import React from "react";
import styles from "./Assignment.module.scss";
import Header from "./../../../components/Header/Header";
import SearchInput from "./../../../components/SearchInput/SearchInput";
import IconAdd from "./../../../assets/ico/icon-material-add-circle-outline.png";
import Button from "./../../../components/Button/Button";
import Pagination from "./../../../components/Pagination/Pagination";
import { useState } from "react";
import ListAssginment from "./components/ListAssignment/ListAssignment";
import ModalCreatePartition from "./components/CreatePartition/ModalCreatePartition";
import { useDispatch } from 'react-redux';
import { getALLUserAutoComplete } from './../../../store/assignment/AssignmentSlice';

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
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  dispatch(getALLUserAutoComplete());

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
            icon={IconAdd}
            text="Tạo phân vùng mới"
            onSubmit={() => {
              setShowModal(true);
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

        <ModalCreatePartition visible={showModal} onCancel={() => setShowModal(false)}/>
      </div>
    </div>
  );
};

export default Assignment;
