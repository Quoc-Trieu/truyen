import React, { useEffect, useRef, useState } from "react";
import Header from "./../../../components/Header/Header";
import "./tinhLuong.scss";
import iconExcel from "../../../assets/images/excel.png";
import iconSetting from "../../../assets/images/setting.png";
import icon_calendar from "../../../assets/ico/icon-calendar.png";
import icon_down from "../../../assets/ico/icon-feather-chevron-down.png";
import {
  excelExport,
  getUserSalary,
  updateSalaryOther,
  updateSetting,
} from "../../../services/salaryServices";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import Notiflix from "notiflix";
import { permissionEdiSelector } from "./../../../store/auth/authSlice";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/vi";
import { useSelector } from "react-redux";
import numeral from 'numeral';

function TinhLuong() {
  const permissionEditUser = useSelector(permissionEdiSelector);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateShow, setSelectedDateShow] = useState(
    moment(new Date()).format("MM-YYYY")
  );
  const [dataSalary, setDataSalary] = useState([]);
  const [dongiasanluong, setDongiasanluong] = useState("");
  const [dongiachedo, setDongiachedo] = useState("");
  const [salaryOther, setSalaryOther] = useState("");
  const [errOther, setErrOther] = useState(false);
  const [idUser, setIdUser] = useState("");

  const [openSetting, setOpenSetting] = useState(false);
  const [openSalaryOther, setOpenSalaryOther] = useState(false);

  const [totalSanluong, setTotalSanluong] = useState("");
  const [totalWork, setTotalWork] = useState("");
  const [totalLuongSanluong, setTotalLuongSanluong] = useState("");
  const [totalLuongChedo, setTotalLuongChedo] = useState("");
  const [totalLuongKhac, setTotalLuongKhac] = useState("");
  const [total, setTotal] = useState("");
  const refInputPicker = useRef(null);

  // handle setting
  const handleOpenSetting = () => setOpenSetting(true);
  const handleCloseSetting = () => setOpenSetting(false);
  // handle update salary other
  const handleOpenSalaryOther = () => setOpenSalaryOther(true);
  const handleCloseSalary = () => setOpenSalaryOther(false);
  // lấy sanh sách lương của bộ phận nhân công
  const getsalary = () => {
    getUserSalary(selectedDate)
      .then((res) => {
        setDataSalary(res.data.dataSalary);
        setTotalSanluong(() => {
          return res.data.dataSalary.reduce((total, item) => {
            return total + item.quantity;
          }, 0);
        });
        setTotalWork(() => {
          return res.data.dataSalary.reduce((total, item) => {
            return total + item.dayWork;
          }, 0);
        });
        setTotalLuongSanluong(() => {
          return res.data.dataSalary.reduce((total, item) => {
            return total + item.salaryQuantity;
          }, 0);
        });
        setTotalLuongChedo(() => {
          return res.data.dataSalary.reduce((total, item) => {
            return total + item.salaryWork;
          }, 0);
        });
        setTotalLuongKhac(() => {
          return res.data.dataSalary.reduce((total, item) => {
            return total + item.salaryMore;
          }, 0);
        });
        setTotal(() => {
          return res.data.dataSalary.reduce((total, item) => {
            return total + item.salaryAll;
          }, 0);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // firstime get
  useEffect(() => {
    getsalary();
  }, [selectedDate]);
  // xử dụng useform của react form để check validator
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   hàm này là hàm submit khi lưu cài đặt đơn giản
  const onSubmit = (data) => {
    // kiểm tra nếu 2 giá trị nhập vào nhỏ hơn 0 thì không cho cập nhật 
    if (parseInt(dongiasanluong.replace(/[,.]/g, "")) > 0 && parseInt(dongiachedo.replace(/[,.]/g, ""))) {
      updateSetting({
        date: selectedDate,
        basicSalary: parseInt(data.chedo.replace(/[,.]/g, "")),
        moneyQuantity: parseInt(data.sanluong.replace(/[,.]/g, "")),
      })
        .then((res) => {
          Notiflix.Notify.success("cập nhật thành công");
          handleCloseSetting();
          getsalary();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // hàm này là hàm submit update lương khác của nhân công
  const handleSalaryOther = () => {
    if (salaryOther && parseInt(salaryOther.replace(/[,.]/g, "")) !== 0) {
      setErrOther(false);
      updateSalaryOther({
        date: selectedDate,
        idUser: idUser,
        salary: parseInt(salaryOther.replace(/[,.]/g, "")),
      })
        .then((res) => {
          Notiflix.Notify.success("cập nhật thành công");
          handleCloseSalary();
          getsalary();
          setSalaryOther("")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrOther(true);
    }
  };
  // hàm này là hàm xuất excel
  const handleExportExcel = () => {
    excelExport(selectedDate)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `bangluong.xlsx`);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // form này dùng để format tiền tệ
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // xử lý khi picker date có sự thay đổi
  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM"));
    setSelectedDateShow(moment(date).format("MM-YYYY"));
  };
  // xử lý custom input date picker để sử dụng tiếng việt
  const monthLabels = {
    vi: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
  };
  const customInput = <input readOnly />;
  // xử lý click input date picker giả thì date picker thật cũng được click
  const handleOpenCalen = () => {
    refInputPicker.current._openCalendar();
  };

  const format = (num) => {
    return numeral(num).format('0,0'); // định dạng số với dấu phân cách phần ngàn là dấu phẩy và dấu thập phân là dấu chấm
  }
  return (
    // main
    <div id="tinhluong">
      {/* heading */}
      <div className="heading">
        <Header title="Thống kê sản lượng" />
      </div>
      {/* body */}
      <div className="body-content">
        {/* body top, gồm date picker và 2 button xuất excel vs cài đặt */}
        <div className="top-content">
          <div className="left-top">
            {/* box date picker */}
            <div className="datePickerBox" onClick={() => handleOpenCalen()}>
              {/* block input date picker giả */}
              <div className="datePickerInput">
                <img src={icon_calendar} alt="" />
                <span>tháng {selectedDateShow}</span>
                <img src={icon_down} alt="" />
              </div>
              {/* còn đây là timedatepicker thật nhưng được ẩn đằng sau lớp giả */}
              <div>
                <Datetime
                  ref={refInputPicker}
                  dateFormat="MM/YYYY"
                  timeFormat={false}
                  onChange={handleDateChange}
                  locale="vi"
                  value={
                    selectedDate ? moment(selectedDate).format("MM/YYYY") : ""
                  }
                  renderInput={(_, openCalendar, props) => {
                    return (
                      <input
                        {...props}
                        readOnly
                        value={
                          selectedDate
                            ? moment(selectedDate).format("MMMM YYYY")
                            : ""
                        }
                        onClick={openCalendar}
                      />
                    );
                  }}
                  renderMonth={(props, monthIndex) => {
                    return <td {...props}>{monthLabels["vi"][monthIndex]}</td>;
                  }}
                  input={customInput}
                />
              </div>
            </div>
          </div>
          {/* 2 button xuất excel vs cài đặt */}
          <div className="right-top">
            <div
              className="exportExcel right-top--btn"
              onClick={handleExportExcel}
            >
              <img src={iconExcel} alt="" />
              <span>Xuất file excel</span>
            </div>
            <div
              className="setting right-top--btn"
              onClick={() => handleOpenSetting()}
              style={{ pointerEvents: permissionEditUser ? 'auto' : 'none' }}
            >
              <img src={iconSetting} alt="" />
              <span>Cài đặt đơn giá</span>
            </div>
          </div>
        </div>
        {/* table danh sách bảng lương của nhân công */}
        {/* <div style={{ flex: 1, overflowY: 'scroll' }}> */}
          <div className="colum">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Sản lượng</th>
                  <th>Ngày công</th>
                  <th>Đơn giá sản lượng</th>
                  <th>Đơn giá chế độ</th>
                  <th>Lương sản lượng</th>
                  <th>Lương chế độ</th>
                  <th>Lương khác</th>
                  <th>Tổng</th>
                </tr>
                <tr>
                  <td>I</td>
                  <td>Bộ phận nhân công</td>
                  <td>{formatter.format(totalSanluong)}</td>
                  <td>{totalWork}</td>
                  <td></td>
                  <td></td>
                  <td>{formatter.format(totalLuongSanluong)}</td>
                  <td>{formatter.format(totalLuongChedo)}</td>
                  <td>{formatter.format(totalLuongKhac)}</td>
                  <td>{formatter.format(total)}</td>
                </tr>
              </thead>
              <tbody>
                {dataSalary.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity ? formatter.format(item.quantity) : 0}</td>
                    <td>{item.dayWork ? item.dayWork : 0}</td>
                    <td>{item.priceQuantity ? formatter.format(item.priceQuantity) : 0}</td>
                    <td>{item.priceBase ? formatter.format(item.priceBase) : 0}</td>
                    <td>{item.salaryQuantity ? formatter.format(item.salaryQuantity) : 0}</td>
                    <td>{item.salaryWork ? formatter.format(item.salaryWork) : 0}</td>
                    <td>
                      <div
                        onClick={() => {
                          setIdUser(item.idUser);
                          handleOpenSalaryOther();
                        }}
                      >
                        {formatter.format(item.salaryMore)}
                      </div>
                    </td>
                    <td>{formatter.format(item.salaryAll)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* </div> */}
      </div>
      {/* modal setting */}
      <Modal open={openSetting} onClose={handleCloseSetting}>
        <form onSubmit={handleSubmit(onSubmit)} className="modalSeetingWrap">
          <div className="modalSeetingBox">
            <div className="heading">Cài đặt đơn giá</div>
            <div className="body">
              <div className="boxinput">
                <label htmlFor="">Đơn giá sản lượng</label>
                <CurrencyInput
                  type="text"
                  placeholder="vui lòng nhập đơn giá sản lượng"
                  {...register("sanluong", {
                    required: true,
                  })}
                  defaultValue={dongiasanluong}
                  onChange={(e) => setDongiasanluong(e.target.value)}
                />
                {/* hiển thị lỗi validator */}
                {errors?.sanluong?.type === "required" && (
                  <p className="error">vui lòng không bỏ trống</p>
                )}
                {
                  parseInt(dongiasanluong.replace(/[,.]/g, "")) < 0 ? <p className="error"> trị nhập vào phải lớn hơn 0</p> : ''
                }
              </div>
              <div className="boxinput">
                <label htmlFor="">Đơn giá chế độ</label>
                <CurrencyInput
                  type="text"
                  placeholder="vui lòng nhập đơn giá chế độ"
                  {...register("chedo", {
                    required: true,
                  })}
                  defaultValue={dongiachedo}
                  onChange={(e) => setDongiachedo(e.target.value)}
                />
                {/* hiển thị lỗi validator */}
                {errors?.chedo?.type === "required" && (
                  <p className="error">vui lòng không bỏ trống</p>
                )}
                {
                  parseInt(dongiachedo.replace(/[,.]/g, "")) < 0 ? <p className="error"> trị nhập vào phải lớn hơn 0</p> : ''
                }
              </div>
            </div>
            <div className="bottom">
              <div className="btn Close" onClick={handleCloseSetting}>
                Huỷ
              </div>
              <button type="submit" className="btn Save">
                Lưu
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* modal luong khac */}
      <Modal open={openSalaryOther} onClose={handleCloseSalary}>
        <div className="modalSeetingWrap">
          <div className="modalSeetingBox">
            <div className="heading">Lương khác</div>
            <div className="body">
              <div className="boxinput">
                <label htmlFor="">Nhập lương khác</label>
                <CurrencyInput
                  type="text"
                  placeholder="6,3000"
                  defaultValue={salaryOther}
                  onChange={(e) => setSalaryOther(e.target.value)}
                  format={format}
                />
                {errOther && <p className="error">vui lòng không bỏ trống</p>}
                {
                  parseInt(salaryOther.replace(/[,.]/g, "")) < 0 ? <p className="error"> trị nhập vào phải lớn hơn 0</p> : ''
                }
              </div>
            </div>
            <div className="bottom">
              <div className="btn Close" onClick={handleCloseSalary}>
                Huỷ
              </div>
              <button className="btn Save" onClick={handleSalaryOther}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TinhLuong;
