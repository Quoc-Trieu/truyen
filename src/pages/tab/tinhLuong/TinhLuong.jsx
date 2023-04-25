import React, { useEffect, useState } from "react";
import Header from "./../../../components/Header/Header";
import "./tinhLuong.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from '@mui/material/TextField';
import iconExcel from "../../../assets/images/excel.png";
import iconSetting from "../../../assets/images/setting.png";
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

function TinhLuong() {
  const [time, setTime] = useState(dayjs(new Date()));
  const [dataSalary, setDataSalary] = useState([]);
  const [dongiasanluong, setDongiasanluong] = useState("");
  const [dongiachedo, setDongiachedo] = useState("");
  const [salaryOther, setSalaryOther] = useState("");
  const [errOther, setErrOther] = useState(false);
  const [phoneUser, setPhoneUser] = useState("");

  const [openSetting, setOpenSetting] = useState(false);
  const [openSalaryOther, setOpenSalaryOther] = useState(false);

  const [totalSanluong, setTotalSanluong] = useState("");
  const [totalWork, setTotalWork] = useState("");
  const [totalLuongSanluong, setTotalLuongSanluong] = useState("");
  const [totalLuongChedo, setTotalLuongChedo] = useState("");
  const [totalLuongKhac, setTotalLuongKhac] = useState("");
  const [total, setTotal] = useState("");

  const handleOpenSetting = () => setOpenSetting(true);
  const handleCloseSetting = () => setOpenSetting(false);

  const handleOpenSalaryOther = () => setOpenSalaryOther(true);
  const handleCloseSalary = () => setOpenSalaryOther(false);

  const getsalary = () => {
    getUserSalary(`${time.$y}-${time.$M + 1}-${time.$D}`)
      .then((res) => {
        setDataSalary(res.data.dataSalary);
        setTotalSanluong(() => {
          return dataSalary.reduce((total, item) => {
            return total + item.quantity;
          }, 0);
        });
        setTotalWork(() => {
          return dataSalary.reduce((total, item) => {
            return total + item.dayWork;
          }, 0);
        });
        setTotalLuongSanluong(() => {
          return dataSalary.reduce((total, item) => {
            return total + item.salaryQuantity;
          }, 0);
        });
        setTotalLuongChedo(() => {
          return dataSalary.reduce((total, item) => {
            return total + item.salaryWork;
          }, 0);
        });
        setTotalLuongKhac(() => {
          return dataSalary.reduce((total, item) => {
            return total + item.salaryMore;
          }, 0);
        });
        setTotal(() => {
          return dataSalary.reduce((total, item) => {
            return total + item.salaryAll;
          }, 0);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getsalary();
  }, [time]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    updateSetting({
      date: `${time.$y}-${time.$M + 1}-${time.$D}`,
      basicSalary: parseInt(data.chedo.replace(",", "")),
      moneyQuantity: parseInt(data.sanluong.replace(",", "")),
    })
      .then((res) => {
        console.log(res);
        Notiflix.Notify.success("cập nhật thành công");
        handleCloseSetting();
        getsalary();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSalaryOther = () => {
    if (salaryOther) {
      setErrOther(false);
      updateSalaryOther({
        date: `${time.$y}-${time.$M + 1}-${time.$D}`,
        idUser: phoneUser,
        salary: salaryOther,
      })
        .then((res) => {
          console.log(res);
          Notiflix.Notify.success("cập nhật thành công");
          handleCloseSalary();
          getsalary();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrOther(true);
    }
  };

  const handleExportExcel = () => {
    excelExport(`${time.$y}-${time.$M + 1}-${time.$D}`)
      .then((response) => {
        // console.log(response.data);
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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div id="tinhluong">
      <div className="heading">
        <Header title="Thống kê sản lượng" />
      </div>
      <div className="body-content">
        <div className="top-content">
          <div className="left-top">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker", "DatePicker"]}
              >
                <DatePicker
                  label={'"tháng" và "năm"'}
                  views={['day',"month", "year"]}
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
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
            >
              <img src={iconSetting} alt="" />
              <span>Cài đặt đơn giản</span>
            </div>
          </div>
        </div>
        <div style={{ height: "100%" }}>
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
                    <td>1</td>
                    <td>{item.name}</td>
                    <td>{formatter.format(item.quantity)}</td>
                    <td>{item.dayWork}</td>
                    <td>{formatter.format(item.priceQuantity)}</td>
                    <td>{formatter.format(item.priceBase)}</td>
                    <td>{formatter.format(item.salaryQuantity)}</td>
                    <td>{formatter.format(item.salaryWork)}</td>
                    <td>
                      <div
                        onClick={() => {
                          setPhoneUser(item.phone);
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
        </div>
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
                  placeholder="6,3000"
                  {...register("sanluong", {
                    required: true,
                  })}
                  defaultValue={dongiasanluong}
                  onChange={(e) => setDongiasanluong(e.target.value)}
                />
                {errors?.sanluong?.type === "required" && (
                  <p className="error">vui lòng không bỏ trống</p>
                )}
              </div>
              <div className="boxinput">
                <label htmlFor="">Đơn giá chế độ</label>
                <CurrencyInput
                  type="text"
                  placeholder="6,3000"
                  {...register("chedo", {
                    required: true,
                  })}
                  defaultValue={dongiachedo}
                  onChange={(e) => setDongiachedo(e.target.value)}
                />
                {errors?.chedo?.type === "required" && (
                  <p className="error">vui lòng không bỏ trống</p>
                )}
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
                />
                {errOther && <p className="error">vui lòng không bỏ trống</p>}
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
