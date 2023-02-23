import React, { useState, useEffect } from "react";
import styles from "./FooterAssignment.module.scss";
import ButtonSimple from './../../../../../../components/Button/ButtonSimple';
import { idUserPartitionSelector, listScapingSelector, namePartitionSelector, setCatchError, clearError, setListScaping } from './../../../../../../store/assignment/AssignmentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { postCreateScaping, putLocationScaping } from "./../../../../../../services/assignmentServices";
import  Notiflix  from 'notiflix';


const FooterAssignment = ({onCancel}) => {
  const dispatch = useDispatch();
  const listScaping = useSelector(listScapingSelector);
  const idUserPartition = useSelector(idUserPartitionSelector);
  const namePartition = useSelector(namePartitionSelector);

  const onSummit = () => {
    console.log("listAssignment: " ,listScaping);
    if(!checkError())
    {
      dispatch(clearError());
      convertMap(listScaping)
    }else {
      Notiflix.Notify.warning("Vui lòng kiểm tra lại thông tin");
    }
  }

  useEffect(() => {
    console.log(idUserPartition);
    checkError();
  },[listScaping, idUserPartition, namePartition])

  const checkError = () => {
    let isError = false;
    if( idUserPartition == null || idUserPartition == "")
    {
      dispatch(setCatchError({idUserPartitionError: "Vui lòng chọn người thực hiện"}))
      isError = true;
    }else {
      dispatch(setCatchError({idUserPartitionError: ""}))
    }
    if( namePartition == null || namePartition == "")
    {
      dispatch(setCatchError({namePartitionError: "Vui lòng nhập tên vùng cạo"}))
      isError = true;
    } else {
      dispatch(setCatchError({namePartitionError: ""}))
    }
    if( listScaping[listScaping.length - 1]?.land == null)
    {
      dispatch(setCatchError({landError: "Vui lòng chọn lô"}))
      isError = true;
    } else {
      dispatch(setCatchError({landError: ""}))
    }
    if( listScaping[listScaping.length - 1]?.row == null)
    {
      dispatch(setCatchError({rowError: "Chưa nhập hàng cạo"}))
      isError = true;
    }else {
      dispatch(setCatchError({rowError: ""}))

    }
    return isError;
  }

  const convertMap = (listScaping) => {
    let line1 = [];
    let line2 = [];
    let line3 = [];
    let line4 = [];

    const firstRow = listScaping[0]?.row;
    const startTreeFirstRow = (listScaping[0]?.startTree);
    const endTreeFirstRow = (listScaping[0]?.endTree);

    const lastRow = listScaping[listScaping.length-1]?.row;
    const startTreeLastRow = (listScaping[listScaping.length-1]?.startTree);
    const endTreeLastRow = (listScaping[listScaping.length-1]?.endTree);

    const lengthItem = listScaping.length;

    // line 1: tất cả các cây của hàng đàu tiên (đầu => cuối)
    for(let i = startTreeFirstRow; i <= endTreeFirstRow; i++)
    {
      const tree=paddedString(i, 3);
      line1.push(firstRow + tree);
    }
    // line 2 các cây cuối của các hàng (đầu => cuối)
    for(let i = 0; i < lengthItem; i++)
    {
      const tree=paddedString(listScaping[i]?.endTree, 3);
      line2.push(listScaping[i]?.row + tree);
    }
    // line 3 tất cả các cây của hàng cuối cùng (cuối => đầu)
    for(let i = endTreeLastRow; i >= startTreeLastRow; i--)
    {
      const tree=paddedString(i, 3);
      line3.push(lastRow + tree);
    }
    // line 4 tất cả các cây đầu của các hàng (cuối => đầu)
    for(let i = lengthItem; i > 0; i--)
    {
      const tree=paddedString(listScaping[i-1]?.startTree, 3);
      line4.push(listScaping[i-1]?.row + tree);
    }
    console.log("result: " ,line1);

    const result = line1.concat(line2, line3, line4);
    console.log("result: " ,result);

    // tạo vùng cạo
    const postCreatePartition = async () => {
      try {
        const res = await postCreateScaping( { idUserPartition: idUserPartition, name : namePartition})
        const idScaping = res.data?._id; //res.data?._id;
        console.log("result idScaping: " ,result);
        const res2 = await putLocationScaping({ idScaping: idScaping, data : result })
        console.log("result putLocationScaping: " ,res2);
        onCancel && onCancel();
        Notiflix.Notify.success("Tạo vùng cạo thành công");
      } catch (error) {
        if(error?.response?.data?.code == "TREE_IS_EXIST_IN_SCAPING")
        {
          Notiflix.Notify.failure("Cây nằm trong vùng cạo khác");
        }else {
            if(error?.response?.data?.code == "SCAPING_EXIST")
            {
                Notiflix.Notify.failure("Vùng cạo đã tồn tại");
            }else {
              Notiflix.Notify.failure("Tạo vùng cạo thất bại");
            }
        }
        console.log(error.response);
      }
    }
    postCreatePartition();
  }

  const paddedString = (number, length) => {
    // hàm này để convert số thành chuỗi có độ dài length(lấy số convert sang id Cây)
    let strNum = String(number);
    let numZeros = length - strNum.length;
    return 'C' + '0'.repeat(numZeros) + strNum;
  }
 
  return (
    <div className={styles.footerAssignment}>
        <ButtonSimple bold text="Hủy" onSummit={onCancel}/>
        <ButtonSimple bold text="Xác nhận" styleCustom={{background: 'linear-gradient(90deg, #6AB100 0%, #85E000 100%)'}} onSummit={onSummit}/>
        
    </div>
  );
};

export default FooterAssignment;
