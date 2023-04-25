import React from 'react';
import styles from './Divisions.module.scss';
import Header from '../../../components/Header/Header';
import iconArrow from '../../../assets/ico/icon-feather-arrow-right-long.png';
import { useNavigate } from 'react-router-dom';
import { getInfoAreaScaping } from '../../../services/assignmentServices';
import { useState } from 'react';
import { useEffect } from 'react';

const Divisions = () => {
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    const getDivisions = async () => {
      const res = await getInfoAreaScaping();
      setDivisions(res.data);
      console.log(res.data);
    };
    getDivisions();
  }, []);

  return (
    <div className={styles.divisions}>
      <Header title="Quản lý công việc" name="Nguyễn Văn A" />

      <div className={styles.divisions__content}>
        {divisions &&
          divisions.map((item, index) => {
            return (
              <div key={index} className={styles.divisions__item} onClick={() => navigate('/assignment', { state: { subDivision: item } })}>
                <div className={styles.divisions__item__symbol}>
                  {/* lấy ký tự cuối division?.name */}
                  <span>{item?.name?.charAt(item?.name?.length - 1)}</span>
                </div>
                <div className={styles.divisions__item__content}>
                  <div className={styles.divisions__item__title}>{item?.name}</div>
                  <div className={styles.divisions__item__description}>Tổng phần cạo </div>
                  <div className={styles.divisions__item__totalTree}>{item?.infoScaping?.length}</div>
                  <img src={iconArrow} width="100%" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Divisions;
