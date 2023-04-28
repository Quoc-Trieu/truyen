import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useTable } from 'react-table';
import Header from './../../../components/Header/Header';
import styles from './AttendanceCheck.module.scss';
import { getCurrentDay, getDaysInCurrentMonth, getDayFromDateString, getDaysInMonth } from './../../../utils/methods';
import { getAttendanceInMonth } from './../../../services/attendanceService';
import ColorDots from './../../../components/ColorDots/ColorDots';
import STATUS_ATTENDANCE from './../../../constants/statusAttendance';
import ModalAttendance from './ModalAttendance';
import SearchInput from './../../../components/SearchInput/SearchInput';
import DatePicker, { registerLocale } from 'react-datepicker';
import iconCalendar from './../../../assets/ico/icon-calendar.png';
import iconDown from './../../../assets/ico/icon-feather-chevron-down.png';
import vi from 'date-fns/locale/vi';

const vietnameseMonths = {
  0: 'Tháng 1',
  1: 'Tháng 2',
  2: 'Tháng 3',
  3: 'Tháng 4',
  4: 'Tháng 5',
  5: 'Tháng 6',
  6: 'Tháng 7',
  7: 'Tháng8',
  8: 'Tháng 9',
  9: 'Tháng 10',
  10: 'Tháng 11',
  11: 'Tháng 12',
};

registerLocale('vi', { ...vi, localize: { month: (n) => vietnameseMonths[n] } });

const AttendanceCheck = () => {
  const [monthOfTable, setMonthOfTable] = useState(new Date());
  // console.log('today', monthOfTable);
  const dates = useMemo(() => getDaysInMonth(monthOfTable), [monthOfTable]);
  // console.log('dates', dates);
  const dayNow = getCurrentDay();
  const dayRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [propPassModal, setPropPassModal] = useState(null);
  // state chứa dữ liệu cho bảng từ API  [getAttendanceInMonth]
  const [dataAttendance, setDataAttendance] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);

  useEffect(() => {
    fetchData();
  }, [visible, monthOfTable]);

  const fetchData = async () => {
    const timeTable = new Date(monthOfTable.toISOString());
    const response = await getAttendanceInMonth({ date: timeTable });
    setDataAttendance(response?.data);
  };

  // convert data from API để hiển thị bảng, với các cột | STT |	Vùng cạo | Tên |
  const data = useMemo(() => {
    if (!dataAttendance || dataAttendance.length === 0) return [];

    const dataTable = dataAttendance?.arrayUser.map((item, index) => {
      const idUser = item?.idUserPartition;
      //tìm các ngày công của user trong tháng
      const arrayAttendanceUser = dataAttendance.arrayResult.find((arr) => arr.some((obj) => obj.phoneUser === idUser)) ?? [];

      //lọc ra các ngày có đi làm để tính tổng ngày công của user trong tháng
      const arrayTotalWorkdays = arrayAttendanceUser.filter((item) => item.isWork === true);

      // Tạo object chứa dữ liệu cho mỗi dòng của bảng
      const objRow = {
        stt: index + 1,
        vungCao: item.name,
        ten: `${item.infoUser.fullName}\n${idUser}`,
        tongNgayCong: arrayTotalWorkdays.length,
      };

      dates.map((date, index) => {
        // Tìm kiếm trong mảng ngày công của user trong tháng, nếu có thì thêm vào mảng Bảng(dataTable)
        const findItem = arrayAttendanceUser.find((item) => getDayFromDateString(item?.date) === date);

        // Tạo key cho các cột ngày chấm công
        const dayKey = `colDate_${date}`;

        // Thêm dữ liệu vào mảng Bảng(dataTable)
        if (findItem) {
          objRow[dayKey] = findItem.isWork ? (
            <ColorDots color={STATUS_ATTENDANCE.di_lam.color} />
          ) : findItem.isPermission ? (
            <ColorDots color={STATUS_ATTENDANCE.nghi_co_phep.color} />
          ) : (
            <ColorDots color={STATUS_ATTENDANCE.nghi_khong_phep.color} />
          );
        } else {
          // Nếu không có thì thêm màu xám vào mảng Bảng(dataTable)
          objRow[dayKey] = <ColorDots color={STATUS_ATTENDANCE.chua_diem_danh.color} />;
        }
      });

      return objRow;
    });

    return dataTable;
  }, [dataAttendance, monthOfTable]);

  const columns = useMemo(
    () => [
      {
        Header: 'STT',
        accessor: 'stt',
      },
      {
        Header: 'Vùng cạo',
        accessor: 'vungCao',
      },
      {
        Header: 'Tên & Sđt',
        accessor: 'ten',
      },
      {
        Header: 'Tổng \n Ngày công',
        accessor: 'tongNgayCong',
      },
      ...dates.map((date, index) => ({
        Header: `${index + 1}`,
        accessor: `colDate_${date}`,
      })),
    ],
    [monthOfTable]
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  useEffect(() => {
    // nếu ngày trong tháng lớn hơn 10 thì scroll đến ngày hiện tại
    if (dayRef.current) {
      // Tìm index của cột dayNow trong mảng columns
      const dayIndex = columns.findIndex((column) => column.Header === dayNow);
      // Tính toán vị trí cần scroll đến
      const scrollPosition = dayRef.current.offsetLeft - dayRef.current.offsetWidth / 2 - 785; // trừ 785 các cột cố định ở đầu bằng position: sticky
      // Di chuyển thanh cuộn ngang đến vị trí mong muốn
      document.querySelector(`.${styles.tableContainer}`).scrollLeft = scrollPosition;
    }
  }, [dayRef, dayNow, columns]);

  const onOpenModal = ({ valueCol2OfRow, idColum }) => {
    //cắt chuỗi từ dữ liệu của cột của bảng để lấy tên và ngày
    const name = valueCol2OfRow;
    const date = idColum.split('_')[1];
    setPropPassModal({ name, date });
    setVisible(true);
  };

  const onChangeTextSearch = (value) => {
    console.log(value);
    setValueSearch(value);
  };

  const onSubmitSearch = async (value) => {
    const now = new Date().toISOString();
    const response = await getAttendanceInMonth({ date: now, query: value });
    setDataAttendance(response?.data);
  };
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `tháng ${month + 1}-${year}`;
  });
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const handleChange = (e) => {
    setTimeout(() => {
      setIsOpenDatePicker(false);
    }, 100);
    console.log(e.toISOString());
    const date = new Date(e.toISOString());
    // console.log('date', e.toISOString());
    const month = date.getMonth();
    const year = date.getFullYear();
    const textDatePicker = `tháng ${month + 1}-${year}`;

    setStartDate(textDatePicker);
    setMonthOfTable(new Date(e.toISOString()))
    setIsOpenDatePicker(!isOpenDatePicker);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpenDatePicker(true);
  };

  useEffect(() => {
    const handleClick = () => {
      setIsOpenDatePicker(false);
    };
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div className={styles.attendanceCheck}>
      <Header title="Điểm danh nhân công" />

      <div className={styles.body}>
        <div className={styles.toolbar}>
          <SearchInput placeholder="Nhập nhân viên cạo" onChangeText={onChangeTextSearch} onSubmit={onSubmitSearch} />
          <div className={styles.datePicker} onClick={handleClick}>
            <img src={iconCalendar} alt="iconCalendar" width="20px" height="20px" />
            {/* hiển thị startDate ra giao diện */}
            <span>{startDate}</span>
            <img style={{ marginLeft: 'auto' }} src={iconDown} alt="iconDown" width="10px" height="6px" />
            {isOpenDatePicker && (
              <div style={{ width: '800px', position: 'absolute', top: '100%', left: 0, zIndex: 10 }}>
                <DatePicker
                  selected={monthOfTable}
                  locale="vi"
                  onChange={handleChange}
                  inline
                  showMonthYearPicker
                  showFullMonthYearPicker
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={index}
                      {...column.getHeaderProps()}
                      ref={column.Header == dayNow ? dayRef : null}
                      style={{ backgroundColor: column.Header == dayNow ? '#00A2FF' : '' }}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => (
                      // console.log(cell),
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        onClick={() => onOpenModal({ idColum: cell.column.id, valueCol2OfRow: cell.row.allCells[2].value })}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.footerBody}>
          {/* label nghỉ có phép */}
          <div className={styles.elementContainer}>
            <span>
              Tổng nghỉ có phép: <span>{dataAttendance.totalPermission}</span>
            </span>
          </div>
          {/* label nghỉ không phép */}
          <div className={styles.elementContainer}>
            <span>
              Tổng nghỉ không phép: <span>{dataAttendance.totalNonPermission}</span>
            </span>
          </div>

          {/* BOX-BLUE Đúng giờ làm */}
          <div className={styles.BoxTimeAttendance} style={{ marginLeft: '30px' }}>
            <p className={styles.dots} style={{ backgroundColor: '#00e836' }}></p>
            <span style={{ color: '#00851f' }}>Đúng giờ làm</span>
          </div>
          {/* BOX-ORANGE Đúng giờ làm */}
          <div className={styles.BoxTimeAttendance}>
            <p className={styles.dots} style={{ backgroundColor: '#F6B400' }}></p>
            <span style={{ color: '#F6B400' }}>Nghỉ có phép</span>
          </div>
          {/* BOX-RED Đúng giờ làm */}
          <div className={styles.BoxTimeAttendance}>
            <p className={styles.dots} style={{ backgroundColor: '#FF2C2C' }}></p>
            <span style={{ color: '#FF2C2C' }}>Nghỉ không phép</span>
          </div>
        </div>
      </div>

      {visible && (
        <ModalAttendance
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          date={propPassModal?.date}
          name={propPassModal?.name}
          dataAttendance={dataAttendance}
        />
      )}
    </div>
  );
};

export default AttendanceCheck;
