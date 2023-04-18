import React from "react";
import styles from "./Assignment.module.scss";
import Header from "./../../../components/Header/Header";
import SearchInput from "./../../../components/SearchInput/SearchInput";
import IconAdd from "./../../../assets/ico/icon-material-add-circle-outline.png";
import Button from "./../../../components/Button/Button";
import Pagination from "./../../../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import ListAssginment from "./components/ListAssignment/ListAssignment";
import ModalCreatePartition from "./components/CreatePartition/ModalCreatePartition";
import { useDispatch } from 'react-redux';
import { getALLUserAutoComplete, setSearchingAssignment } from './../../../store/assignment/AssignmentSlice';
import ModalEditCreatePartition from './components/EditPartition/ModalEditCreatePartition';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";


const Assignment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const subDivision = location.state?.subDivision;

  const [showModal, setShowModal] = useState(false);
  dispatch(getALLUserAutoComplete());
  const search = useSelector(state => state.assignment.searchingAssignment);

  useEffect(() => {
    dispatch(setSearchingAssignment(""));
  }, [])


  const onSearch = (searchText) => {
    dispatch(setSearchingAssignment(searchText));
    console.log(searchText);
  };

  const onChangeText = (text) => {
    if (text === "") {
      dispatch(setSearchingAssignment(""));
    }
  }

  return (
    <div className={styles.assignmentContainer}>
      <Header title={"Phần cạo khu " + subDivision} back name="Nguyễn Văn A" />
      <div className={styles.assignmentBody}>
        <div className={styles.toolbar}>
          <SearchInput
            placeholder="Nhập vùng cạo"
            onSubmit={onSearch}
            onChangeText={onChangeText}
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
          reload={showModal}
        />

        { showModal && <ModalCreatePartition visible={showModal} onCancel={() => setShowModal(false)}/>}
      </div>
    </div>
  );
};

export default Assignment;
