import React from 'react';
import styles from './StatisticsProduction.module.scss';
import Header from './../../../components/Header/Header';
import iconUp from '../../../assets/ico/icon-feather-chevron-up.png';
import iconDown from '../../../assets/ico/icon-feather-chevron-down.png';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import iconCalendar from './../../../assets/ico/icon-calendar.png';
import { useEffect } from 'react';
import { getQuantityByMonth } from '../../../services/quantityServices';

const StatisticsProduction = () => {
  const [isDropZone, setIsDropZone] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [selectArea, setSelectArea] = useState('Khu A');

  const [monthQuantity, setMonthQuantity] = useState(new Date());
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const getQuantity = async () => {
      const res = await getQuantityByMonth({ date: monthQuantity, query: selectArea, isMonth: 1 });
      console.log(res.data);
      setDataTable(res.data.infoScaping);
    };
    getQuantity();
  }, [selectArea, monthQuantity]);

  const handleClick = (e) => {
    setIsOpenDatePicker(true);
    // console.log(e);
  };

  const handleChange = (date) => {
    setTimeout(() => {
      setIsOpenDatePicker(false);
    }, 100);
    console.log(date);
    setStartDate(date);
    setMonthQuantity(date);
  };
  return (
    <div className={styles.statisticsProduction}>
      <Header title="Thống kê sản lượng" />
      <div className={styles.body1}>
        <div className={styles.toolBar}>
          <Dropdown className={styles.dropDown} onToggle={(isOpen) => setIsDropZone(isOpen)}>
            <Dropdown.Toggle className={styles.containerToggle} style={{ width: '100%' }}>
              <span>{selectArea}</span>
              <img src={isDropZone ? iconDown : iconUp} />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropMenu}>
              <Dropdown.Item
                onClick={() => {
                  setSelectArea('Khu A');
                }}
                className={styles.dropItem}
              >
                Khu A
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSelectArea('Khu B');
                }}
                className={styles.dropItem}
              >
                Khu B
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSelectArea('Khu C');
                }}
                className={styles.dropItem}
              >
                Khu C
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={styles.datePicker} onClick={handleClick}>
            <img src={iconCalendar} alt="iconCalendar" width="20px" height="20px" />
            {/* hiển thị startDate ra giao diện */}
            <span>{startDate.toLocaleDateString()}</span>
            <img style={{ marginLeft: 'auto' }} src={iconDown} alt="iconDown" width="10px" height="6px" />
            {isOpenDatePicker && (
              <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10 }}>
                <DatePicker selected={startDate} onChange={handleChange} inline />
              </div>
            )}
          </div>
          <div className={styles.justifyEnd}>
            <div className={styles.xuatExcelContainer}>
              <span>Xuất file Excel</span>
            </div>
          </div>
        </div>

        {/* Thống kê */}
        <div className={styles.boxContainer}>
          <div className={styles.item}>
            <span className={styles.title}>Mủ chuẩn</span>
            <span className={styles.value}>200kg</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>Mủ nước</span>
            <span className={styles.value}>60kg</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>Mủ chén</span>
            <span className={styles.value}>100kg</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>Mủ dây</span>
            <span className={styles.value}>30kg</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>Mủ đông</span>
            <span className={styles.value}>20kg</span>
          </div>
        </div>

        <div className={styles.totalScapping}>
          <span>Phần Cạo:</span>
          <span className={styles.box}>{dataTable && dataTable.length < 10 ? '0' + dataTable.length : dataTable.length}</span>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Tên phần cạo</th>
                <th>Mủ chuẩn (kg)</th>
                <th>Mủ nước (kg)</th>
                <th>Mủ chén (kg)</th>
                <th>Mủ dây (kg)</th>
                <th>Mủ đông (kg)</th>
              </tr>
            </thead>
            <tbody>
              {dataTable &&
                dataTable.map((item, index) => {
                  console.log(item);
                  return (
                    <tr key={index}>
                      <td>{item?.lsScaping[0]?.scapingName}</td>
                      <td>{item?.total}</td>
                      <td>{item?.waterScaping}</td>
                      <td>{item?.cupScaping}</td>
                      <td>{item?.wireScaping}</td>
                      <td>{item?.solidifiedScaping}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsProduction;
