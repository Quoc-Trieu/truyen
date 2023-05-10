import React, { useState, useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from './Doc.module.scss';
import logo from '../../assets/logo512x512.jpg';
import user from '../../assets/user_icon.png';
import { useNavigate } from 'react-router-dom';
import dataListTruyen from '../../constants/dataListTruyen';
import dataTruyenNew from '../../constants/dataTruyenNew';
import Dropdown from 'react-bootstrap/Dropdown';
import iconDown from '../../assets/icon-feather-chevron-down.png';

const Doc = () => {
    const navigate = useNavigate();

    return (
        <div id={styles.homePage}>
            <div className={styles.header}>
                {/* logo */}
                <div className={styles.headerLeft}>
                    <img src={logo} alt="logo" />
                    <span>Xem Truyện</span>
                </div>
                {/* lọc và tìm kiếm */}
                <div className={styles.headerCenter}>
                    <Dropdown drop="down" >
                        <Dropdown.Toggle className={styles.dropDanhSach}>
                            <span>Danh sách</span>
                            <img src={iconDown} style={{ width: '16px', height: '10px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ padding: 0 }} >
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown drop="down" >
                        <Dropdown.Toggle className={styles.dropDanhSach}>
                            <span>Thể loại</span>
                            <img src={iconDown} style={{ width: '16px', height: '10px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ padding: 0 }} >
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Tìm kiếm */}
                    <div className={styles.timKiem}>
                        <input placeholder="Tìm kiếm" />
                    </div>
                </div>
                {/* tài khoản */}
                <div className={styles.headerRight}>
                    <img src={user} alt="logo" />
                    <div
                        className={styles.buttonLogin}
                        onClick={() => navigate('/login')}
                    >
                        <span>Đăng nhập</span>
                    </div>
                </div>
            </div>

            {/* Truyện HOT */}
            <div className={styles.truyenHot}>
                <div className={styles.title}>
                    <span>TRUYỆN HOT</span>
                </div>

                {/* list thẻ truyện */}
                <div className={styles.listCardTruyen}>
                    {dataListTruyen.map((item, index) => {
                        return (
                            <div key={index} className={styles.cardTruyen}>
                                <img src={item.src} alt="truyen" />
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Truyện mới cập nhập */}
            <div className={styles.truyenNew}>
                <div className={styles.title}>
                    <span>TRUYỆN MỚI CẬP NHẬP</span>
                </div>

                {/* list truyện mới*/}
                <div className={styles.listTruyen}>
                    {dataTruyenNew.map((item, index) => {
                        return (
                            <div key={index} className={styles.itemTruyen}>
                                <span>{item.name}</span>
                                <span>{item.author}</span>
                                <span>{item.chapter}</span>
                                <span>{item.timeUpload}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Doc;
