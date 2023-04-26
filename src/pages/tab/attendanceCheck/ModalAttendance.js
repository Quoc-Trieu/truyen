import React, { useState, useEffect } from 'react';
import styles from './ModalAttendance.module.scss';
import iconSearch from '../../../assets/ico/icon-feather-search.png';
import { useForm } from 'react-hook-form';
import ModalComponent from '../../../components/ModalComponent/ModalComponent';
import { resetSpacing } from '../../../store/assignment/AssignmentSlice';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import iconUp from '../../../assets/ico/icon-feather-chevron-up.png';
import iconDown from '../../../assets/ico/icon-feather-chevron-down.png';
import iconClose from '../../../assets/images/close.png';
import ButtonSimple from '../../../components/Button/ButtonSimple';
import { getInfoAreaScaping, postAttendance, postAttendanceAllInOne, postCreateQuantity } from '../../../services/attendanceService';
import Notiflix from 'notiflix';
import { findIdUserByPhone } from '../../../utils/methods';

const dataCheckAttendance = {
  co_di_lam: { value: 'co_di_lam', isWord: true, isPermission: null, color: '#272727', text: 'Xin nghỉ phép' },
  nghi_co_phep: { value: 'nghi_co_phep', isWord: false, isPermission: true, color: '#F6B400', text: 'Nghỉ có phép' },
  nghi_khong_phep: { value: 'nghi_khong_phep', isWord: false, isPermission: false, color: '#F44336', text: 'Nghỉ không phép' },
};

const ModalAttendance = ({ visible, onCancel, onOk, date, name, dataAttendance }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const nameUser = name?.split('\n')[0] ?? '';
  const phoneUser = name?.split('\n')[1] ?? ''; //id là sđt của nhân viên
  const idUser = findIdUserByPhone({ phone: phoneUser, arrayUser: dataAttendance?.arrayUser });

  //tính mủ chuẩn
  const [totalLatex, setTotalLatex] = useState();

  const [isDropLeave, setIsDropLeave] = useState(false);
  const [isDropZone, setIsDropZone] = useState(false);
  const [isDropArea, setIsDropArea] = useState(false);

  const [isConfirm, setIsConfirm] = useState(false); // lưu trạng thái nhấn xác nhận điểm danh, false là chưa nhấn

  const dates = new Date(date ?? '2022-04-22');
  const isoDate = dates.toISOString();
  const [timeISO, setTimeIOS] = useState(isoDate);
  console.log(isoDate);

  const [checkAttendance, setCheckAttendance] = useState(dataCheckAttendance.co_di_lam); //lưu trạng thái điểm danh
  const [isHaveWork, setIsHaveWork] = useState(true); //lưu trạng thái điểm danh

  const [infoAreaScaping, setInfoAreaScaping] = useState([]); //thông tin khu cạo lấy từ api
  const [selectAreaScaping, setSelectAreaScaping] = useState(null); //lưu khu cạo được chọn
  const [selectShaveScaping, setSelectShaveScaping] = useState(null); //lưu phần cạo được chọn


  useEffect(() => {
    // user có làm việc hay không, để xử lý không cho nhập sản lượng
    setIsHaveWork(checkAttendance == dataCheckAttendance.co_di_lam)
  }, [checkAttendance])


  useEffect(() => {
    const getInfo = async () => {
      const res = await getInfoAreaScaping();
      setInfoAreaScaping(res.data);
    };
    getInfo();
  }, []);

  const onSubmit = async (data) => {
    //  console.log(data); //data lấy từ form
    try {
      //điểm danh User
      const res = await postAttendance({
        idUser: idUser,
        isWork: checkAttendance?.isWord,
        isDelay: false,
        isPermission: checkAttendance?.isPermission,
        note: '',
        date: isoDate,
      });
      // check User đã điểm danh
      if (res?.data?.messenger === 'USER_IS_ATTENDANCE') {
        try {
          //thêm sản lượng User
          const resQuantity = await postCreateQuantity({
            phoneUser: phoneUser,
            idUser: idUser,
            date: isoDate,
            idScaping: selectShaveScaping?._id,
            latexWater: Number(data?.latexWater),
            temp: Number(data?.temp),
            latexCup: Number(data?.latexCup),
            tempCup: Number(data?.tempCup),
            latexSolidified: Number(data?.latexSolidified),
            latexWire: Number(data?.latexWire),
          });
          onOk();
          reset();
          Notiflix.Notify.success('Điểm danh thành công');
        } catch (err) {
          console.log(err?.response?.data?.code === 'SCAPING_NOT_FOUND');
          if (err?.response?.data?.code === 'SCAPING_NOT_FOUND') {
            Notiflix.Notify.failure('User không thuộc khu cạo');
          } else {
            Notiflix.Notify.failure('Thêm sản lượng thất bại');
          }
        }
      } else {
        try {
          //thêm sản lượng User
          const resQuantity = await postCreateQuantity({
            phoneUser: phoneUser,
            idUser: idUser,
            date: isoDate,
            idScaping: selectShaveScaping?._id,
            latexWater: Number(data?.latexWater),
            temp: Number(data?.temp),
            latexCup: Number(data?.latexCup),
            tempCup: Number(data?.tempCup),
            latexSolidified: Number(data?.latexSolidified),
            latexWire: Number(data?.latexWire),
          });
          onOk();
          reset();
          Notiflix.Notify.success('Điểm danh thành công');
        } catch (err) {
          console.log(err?.response?.data?.code === 'SCAPING_NOT_FOUND');
          if (err?.response?.data?.code === 'SCAPING_NOT_FOUND') {
            Notiflix.Notify.failure('User không thuộc khu cạo');
          } else {
            Notiflix.Notify.failure('Thêm sản lượng thất bại');
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onCalculateLatex = handleSubmit((data) => {
    console.log(data);
    const latexWater = Number(data?.latexWater);
    const latexCup = Number(data?.latexCup);
    const latexSolidified = Number(data?.latexSolidified);
    const latexWire = Number(data?.latexWire);

    const temp = Number(data?.temp); //nhiệt độ nước
    const tempCup = Number(data?.tempCup); //nhiệt độ chén

    const total = (latexWater * temp) / 100 + (latexCup * tempCup) / 100 + (latexWire * 50) / 100 + (latexSolidified * 40) / 100;
    setTotalLatex(total);
  });

  const handleOnInput = (event) => {
    const value = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/; // chỉ cho phép nhập số và dấu chấm
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1); // loại bỏ ký tự cuối cùng nếu không hợp lệ
    }
  };

  const onSubmitException = async () => {
    // nếu không đi làm thì không cần nhập sản lượng
    if (checkAttendance !== dataCheckAttendance.co_di_lam) {
      try {
        const res = await postAttendance({
          idUser: idUser,
          isWork: checkAttendance?.isWord,
          isDelay: false,
          isPermission: checkAttendance?.isPermission,
          note: '',
          date: isoDate,
        });
        if (res?.data?.messenger === 'USER_IS_ATTENDANCE') {
          Notiflix.Notify.failure('Đã điểm danh rồi');
        } else {
          onOk();
          reset();
          Notiflix.Notify.success('Điểm danh thành công');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsConfirm(true);
    }
  };

  return (
    <ModalComponent
      title="THÔNG TIN ĐIỂM DANH"
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        onCancel();
      }}
      width={1000}
      alignHeader="left"
      styleHeader={{ padding: '10px 40px 5px 40px' }}
      styleWrapper={{ backgroundColor: '#FFF' }}
    >
      <div className={styles.wrapperModalAttendance}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.infoUser}>
            <div className={styles.date}>
              <span className={styles.dateText}>Ngày cạo: </span>
              <span className={styles.dateValue}>{date}</span>
            </div>
            <div className={styles.date}>
              <span className={styles.dateText}>Người cạo: </span>
              <span className={styles.dateValue}>{nameUser}</span>
            </div>
            {/* Drop chọn loại nghỉ phép */}
            <Dropdown className={styles.dropDown} onToggle={(isOpen) => setIsDropLeave(isOpen)}>
              <Dropdown.Toggle className={styles.containerToggle} style={{ width: '100%' }}>
                <span style={{ color: checkAttendance.color }}> {checkAttendance.text} </span>
                {checkAttendance.value == 'co_di_lam' ? (
                  <img src={isDropLeave ? iconDown : iconUp} />
                ) : (
                  <img
                    src={iconClose}
                    style={{ width: '20px', height: '20px' }}
                    onClick={() => setCheckAttendance(dataCheckAttendance.co_di_lam)}
                  />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.dropMenu}>
                <Dropdown.Item
                  onClick={() => setCheckAttendance(dataCheckAttendance.nghi_co_phep)}
                  className={styles.dropItem}
                  style={{ color: dataCheckAttendance.nghi_co_phep.color }}
                >
                  {dataCheckAttendance.nghi_co_phep.text}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setCheckAttendance(dataCheckAttendance.nghi_khong_phep)}
                  className={styles.dropItem}
                  style={{ color: dataCheckAttendance.nghi_khong_phep.color }}
                >
                  {dataCheckAttendance.nghi_khong_phep.text}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className={styles.lineBreak}></div>

          <span className={styles.labelQuantity}>Sản Lượng Ngày Cạo</span>

          <div className={styles.selectShavingArea} style={{pointerEvents: isHaveWork ? 'auto' : 'none' }}>
            {/* Drop chọn khu */}
            <div>
              <Dropdown className={styles.dropDown} onToggle={(isOpen) => setIsDropZone(isOpen)}>
                <Dropdown.Toggle className={styles.containerToggle} style={{ width: '100%' }}>
                  <span> {selectAreaScaping ? selectAreaScaping?.name : 'Chọn khu'} </span>
                  <img src={isDropZone ? iconDown : iconUp} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropMenu}>
                  {/* map infoAreaScaping */}
                  {infoAreaScaping &&
                    infoAreaScaping.map((item, index) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            setSelectAreaScaping(item);
                            setSelectShaveScaping(null);
                          }}
                          className={styles.dropItem}
                          key={index}
                        >
                          {item.name}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
              {!selectAreaScaping && isConfirm == true ? <span className={styles.error}>Vui lòng chọn khu</span> : null}
            </div>

            {/* Drop chọn Phần cạo */}
            <div>
              <Dropdown className={styles.dropDown} onToggle={(isOpen) => setIsDropArea(isOpen)}>
                <Dropdown.Toggle className={styles.containerToggle} style={{ width: '100%' }}>
                  <span>{selectShaveScaping ? selectShaveScaping?.name : 'Chọn phần cạo'}</span>
                  <img src={isDropArea ? iconDown : iconUp} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropMenu}>
                  {selectAreaScaping &&
                    selectAreaScaping.infoScaping.map((item, index) => {
                      return (
                        <Dropdown.Item className={styles.dropItem} key={index} onClick={() => setSelectShaveScaping(item)}>
                          {item.name}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
              {!selectShaveScaping && isConfirm == true ? <span className={styles.error}>Vui lòng chọn khu</span> : null}
            </div>
          </div>

          {/* Nhập các loại mủ */}
          <div className={styles.latex} style={{pointerEvents: isHaveWork ? 'auto' : 'none' }}>
            {/* Mủ nước */}
            <div className={styles.latexItem}>
              <span className={styles.labelLatex}>Mủ nước</span>
              <div className={styles.inputConcentration}>
                <input
                  onInput={handleOnInput}
                  min="0.01"
                  step="0.01"
                  type="text"
                  {...register('temp', { required: true, pattern: /^[1-9]\d*$/ })} // pattern là số nguyên dương
                  placeholder="00"
                  className={styles.input}
                />
                <span className={styles.unit}>%</span>
              </div>
              <div className={styles.inputConcentration}>
                <input
                  onInput={handleOnInput}
                  step="0.01"
                  type="text"
                  {...register('latexWater', { required: true })}
                  placeholder="00"
                  className={styles.input}
                />
                <span className={styles.unit}>kg</span>
              </div>
            </div>
            {/* Mủ chén */}
            <div className={styles.latexItem}>
              <span className={styles.labelLatex}>Mủ chén</span>
              <div className={styles.inputConcentration}>
                <input
                  onInput={handleOnInput}
                  readOnly
                  min="0.01"
                  step="0.01"
                  type="text"
                  value={40}
                  {...register('tempCup', { required: true })}
                  className={styles.input}
                />
                <span className={styles.unit}>%</span>
              </div>
              <div className={styles.inputConcentration}>
                <input
                  onInput={handleOnInput}
                  type="text"
                  step="0.01"
                  {...register('latexCup', { required: true })}
                  placeholder="00"
                  className={styles.input}
                />
                <span className={styles.unit}>kg</span>
              </div>
            </div>
            {/* Mủ dây */}
            <div className={styles.latexItem}>
              <span className={styles.labelLatex}>Mủ dây</span>
              <div className={styles.inputConcentration}>
                <input onInput={handleOnInput} readOnly min="0.01" type="text" step="0.01" value={50} className={styles.input} />
                <span className={styles.unit}>%</span>
              </div>
              <div className={styles.inputConcentration}>
                <input
                  onInput={handleOnInput}
                  type="text"
                  step="0.01"
                  {...register('latexWire', { required: true })}
                  placeholder="00"
                  className={styles.input}
                />
                <span className={styles.unit}>kg</span>
              </div>
            </div>
            {/* Mủ đông */}
            <div className={styles.latexItem}>
              <span className={styles.labelLatex}>Mủ đông</span>
              <div className={styles.inputConcentration}>
                <input onInput={handleOnInput} readOnly min="0.01" type="text" step="0.01" value={40} className={styles.input} />
                <span className={styles.unit}>%</span>
              </div>
              <div className={styles.inputConcentration}>
                <input
                  onInput={handleOnInput}
                  type="text"
                  step="0.01"
                  {...register('latexSolidified', { required: true })}
                  placeholder="00"
                  className={styles.input}
                />
                <span className={styles.unit}>kg</span>
              </div>
            </div>

            {/* nút dấu bằng */}
            <div className={styles.itemEqual} onClick={onCalculateLatex}>
              <span className={styles.labelLatex}>=</span>
            </div>

            {/* Mủ đông */}
            <div className={styles.latexItem}>
              <span className={styles.labelLatex} style={{ backgroundColor: '#61A300' }}>
                Mủ chuẩn
              </span>
              <div className={styles.inputConcentration}>
                <input readOnly type="text" step="0.01" value={totalLatex} className={styles.input} />
                <span className={styles.unit}>kg</span>
              </div>
            </div>
          </div>

          {Object.keys(errors).length !== 0 && <p className={styles.error}>Chưa chọn phần cạo</p>}

          {/* footer */}
          <div className={styles.footer}>
            <button
              className={styles.btnCancel}
              onClick={() => {
                onCancel();
              }}
            >
              Hủy
            </button>
            <button
              className={styles.btnSubmit}
              type={isHaveWork ? 'submit' : ''}
              onClick={onSubmitException}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </ModalComponent>
  );
};

export default ModalAttendance;
