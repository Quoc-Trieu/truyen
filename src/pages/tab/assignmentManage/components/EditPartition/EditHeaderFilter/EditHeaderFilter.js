import React, { useState, useEffect } from "react";
import styles from "./EditHeaderFilter.module.scss";
import iconSearch from "../../../../../../assets/ico/icon-feather-search.png";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { getALLUserAutoComplete, setIdUserPartition, setNamePartition, userAutoCompleteSelector, catchErrorSelector, setIdScapingEdit, isEditSelector, namePartitionSelector } from "../../../../../../store/assignment/AssignmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../../../../../store/auth/authSlice";
import { getInfo } from './../../../../../../services/userServies';
import { getScapingByName } from "./../../../../../../services/assignmentServices";

const EditHeaderFilter = ({data}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const catchError = useSelector(catchErrorSelector);
  const userInfo = useSelector(userInfoSelector);
  const listUser = useSelector(userAutoCompleteSelector);
  const idEdit = useSelector(isEditSelector);
  const namePartitionRedux = useSelector(namePartitionSelector);
  const [nameMaster, setNameMaster] = useState('');

  console.log(listUser);
  const [value, setValue] = useState(data?.nameUser);
  const [listSuggest, setListSuggest] = useState([]);
  console.log(listSuggest);
  const [showSuggest, setShowSuggest] = useState(false);
  const [nameScaping, setNameScaping] = useState(data?.name);

  useEffect(() => {
  //lưu tên idScaping store khi nhấn Detail
    dispatch(setIdScapingEdit(data?._id));
    dispatch(setNamePartition(data?.name))
    dispatch(setIdUserPartition(data?.idUserPartition));
  },[])

  const onChangeSearch = (value) => {
    setValue(value);
    setShowSuggest(value ? true : false)
    dispatch(setIdUserPartition(""));
    //xử lý hiển thị gợi ý tìm kiếm khi nhập
    const searchTerms = suggestSearchTerms(value, listUser);
    setListSuggest(searchTerms);
  };

  
  const onChangeNameScaping = (value) => {
    setNameScaping(value)
    console.log(value);
    dispatch(setNamePartition(value))
  };

  const suggestSearchTerms = (inputValue, dataArray) => {
    const suggestions = [];
    for (let i = 0; i < dataArray.length; i++) {
      // tìm kiếm theo tên và số điện thoại
      if ( dataArray[i]?.fullName.toLowerCase().includes(inputValue.toLowerCase()) ||
          dataArray[i]?.phone.toLowerCase().includes(inputValue.toLowerCase()) ) 
      {
        suggestions.push(dataArray[i]);
      }
    }
    return suggestions;
  };

  const onSubmit = (data) => {

  }

  const onSelectItem = (item) => {
    setValue(item?.fullName);
    setShowSuggest(false);
    dispatch(setIdUserPartition(item?.phone))
  };

  useEffect(() => {
    const getNameTaskMaster = async () => {
      try {
        // tìm vùng cạo và lấy tên người giao
        const resInfo = await getScapingByName(data?.name);
        const resName = await getInfo(resInfo?.data?.taskMaster);
        setNameMaster(resName?.data?.fullName);
      } catch (error) {
        console.log('error getNameTaskMaster' + error);
      }
    };
    getNameTaskMaster();
  },[])

  return (
    <form className={styles.HeaderFilter} onSubmit={handleSubmit(onSubmit)} style={{pointerEvents: idEdit ? 'auto' :'none'}}>
      {/* Người giao */}
      <div className={styles.deliver}>
        <div className={styles.labelDeliver}>
          <div className={styles.circle}></div>
          <span>Người giao</span>
        </div>
        <input readOnly={true} placeholder={nameMaster} className={styles.inputDeliver}/>
      </div>

      <Dropdown className={styles.dropPerformer} show={showSuggest}>
        <Dropdown.Toggle className={styles.performerToggle}>
          {/* Người thực hiện */}
          <div className={styles.labelPerformer}>
            <div className={styles.circle}></div>
            <span>Người thực hiện</span>
          </div>
          <div className={styles.inputPerformerContainer}>
            <input
              placeholder="Nhập tên người thực hiện"
              className={styles.inputPerformer}
              value={value}
              onChange={(e) => onChangeSearch(e.target.value)}
              // {...register("inputPerformer")}
            />
            <button className={styles.btnPerformer}>
              <img src={iconSearch} />
            </button>
          </div>
          <span className={styles.errorInput}>{catchError?.idUserPartitionError}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.performerMenu} style={{ padding: 0 }}>
          {listSuggest &&
            listSuggest?.map((item, index) => {
              return (
                <Dropdown.Item key={index} className={styles.itemDropdown} onClick={() => onSelectItem(item)}>
                  {item?.fullName + " - " + item?.phone}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>

      {/* Tên vùng cạo */}
      <div className={styles.shavingArea}>
        <div className={styles.labelShavingArea}>
          <div className={styles.circle}></div>
          <span>Tên vùng cạo</span>
        </div>
        <input value={nameScaping}  onChange={(e) => onChangeNameScaping(e.target.value)} placeholder="Nhập tên vùng cạo" className={styles.inputShavingArea} />
        <span className={styles.errorInput}>{catchError?.namePartitionError}</span>
      </div>
    </form>
  );
};

export default EditHeaderFilter;
