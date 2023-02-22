import React, { useState, useEffect } from "react";
import styles from "./FooterAssignment.module.scss";
import ButtonSimple from './../../../../../../components/Button/ButtonSimple';
import { idUserPartitionSelector, listScapingSelector, namePartitionSelector } from './../../../../../../store/assignment/AssignmentSlice';
import { useSelector } from 'react-redux';
import { postCreateScaping, putLocationScaping } from "./../../../../../../services/assignmentServices";


const FooterAssignment = () => {
  const listScaping = useSelector(listScapingSelector);
  const idUserPartition = useSelector(idUserPartitionSelector);
  const namePartition = useSelector(namePartitionSelector);
  const [idPartitionNew, setIdPartitionNew] = useState(null);

  const onSummit = () => {
    console.log("listAssignment: " ,listScaping);
    convertMap(listScaping)
  }

  const paddedString = (number, length) => {
    // hàm này để convert số thành chuỗi có độ dài length(lấy số convert sang id Cây)
    let strNum = String(number);
    let numZeros = length - strNum.length;
    return 'C' + '0'.repeat(numZeros) + strNum;
  }
  const convertMap = (listScaping) => {
    let line1 = [];
    let line2 = [];
    let line3 = [];
    let line4 = [];

    const hangFirst = listScaping[0]?.row;
    const start = (listScaping[0]?.startTree);
    const end = (listScaping[0]?.endTree);

    const hangLast = listScaping[listScaping.length-1]?.row;
    const startLast = (listScaping[listScaping.length-1]?.startTree);
    const endLast = (listScaping[listScaping.length-1]?.endTree);

    const lengthItem = listScaping.length;

    for(let i = start; i <= end; i++)
    {
      const tree=paddedString(i, 3);
      line1.push(hangFirst + tree);
    }

    for(let i = 0; i < lengthItem; i++)
    {
      const tree=paddedString(listScaping[i].endTree, 3);
      line2.push(listScaping[i].row + tree);
    }

    for(let i = endLast; i >= startLast; i--)
    {
      const tree=paddedString(i, 3);
      line3.push(hangLast + tree);
    }

    for(let i = lengthItem; i > 0; i--)
    {
      const tree=paddedString(listScaping[i-1].startTree, 3);
      line4.push(listScaping[i-1].row + tree);
    }

    const result = line1.concat(line2, line3, line4);
    console.log("result: " ,result);

    // tạo vùng cạo
    const postCreatePartition = async () => {
      try {
        const res = await postCreateScaping( { idUserPartition: idUserPartition, name : namePartition})
        setIdPartitionNew(res.data?._id);
        const idScaping = res.data?._id; //res.data?._id;
        console.log("res: " ,result);
        const res2 = await putLocationScaping({ idScaping: idScaping, data : result })
      } catch (error) {
        console.log(error);
      }
    }
    // postCreatePartition();

    console.log("idUserPartition: " ,idUserPartition);
    console.log("namePartition: " ,namePartition);

  }
 
  return (
    <div className={styles.footerAssignment}>
        <ButtonSimple bold text="Hủy" />
        <ButtonSimple bold text="Xác nhận" styleCustom={{background: 'linear-gradient(90deg, #6AB100 0%, #85E000 100%)'}} onSummit={onSummit}/>
        
    </div>
  );
};

export default FooterAssignment;
