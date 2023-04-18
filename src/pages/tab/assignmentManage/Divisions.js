import React from 'react';
import styles from './Divisions.module.scss';
import Header from '../../../components/Header/Header';
import iconArrow from '../../../assets/ico/icon-feather-arrow-right-long.png';
import { useNavigate } from 'react-router-dom';

const Divisions = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.divisions}>
      <Header title="Quản lý công việc" name="Nguyễn Văn A" />

      <div className={styles.divisions__content}>
        {/* khu A */}
        <div className={styles.divisions__item} onClick={() => navigate('/assignment', { state: { subDivision: 'A' } })}>
          <div className={styles.divisions__item__symbol}>
            <span>A</span>
          </div>
          <div className={styles.divisions__item__content}>
            <div className={styles.divisions__item__title}>Khu A</div>
            <div className={styles.divisions__item__description}>Tổng phần cây </div>
            <div className={styles.divisions__item__totalTree}>62</div>
            <img src={iconArrow} width="100%" />
          </div>
        </div>

        {/* khu B */}
        <div className={styles.divisions__item} onClick={() => navigate('/assignment', { state: { subDivision: 'B' } })}>
          <div className={styles.divisions__item__symbol}>
            <span>B</span>
          </div>
          <div className={styles.divisions__item__content}>
            <div className={styles.divisions__item__title}>Khu B</div>
            <div className={styles.divisions__item__description}>Tổng phần cây </div>
            <div className={styles.divisions__item__totalTree}>62</div>
            <img src={iconArrow} width="100%" />
          </div>
        </div>

        {/* khu C */}
        <div className={styles.divisions__item} onClick={() => navigate('/assignment', { state: { subDivision: 'C' } })}>
          <div className={styles.divisions__item__symbol}>
            <span>C</span>
          </div>
          <div className={styles.divisions__item__content}>
            <div className={styles.divisions__item__title}>Khu C</div>
            <div className={styles.divisions__item__description}>Tổng phần cây </div>
            <div className={styles.divisions__item__totalTree}>70</div>
            <img src={iconArrow} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divisions;
