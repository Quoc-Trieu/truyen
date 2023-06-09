import React from "react";
import Nav from '../../components/Nav/Nav'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import styles from "./Home.module.scss";
import { getPhoneLocalStorage } from './../../utils/localStorage';
import { useDispatch } from 'react-redux';
import { getALLInfoUser } from './../../store/user/UserSlice';
import { getInfoUser } from './../../store/auth/authSlice';
import { getALLTrees } from './../../store/tree/TreeSlice';

function Home() {
  const dispatch = useDispatch();
  dispatch(getInfoUser())
  // dispatch(getALLInfoUser())
  dispatch(getALLTrees())
  
  return (
    <div className={styles.home}>
      <Nav />
      <div className={styles.homeRight}>
        {/* dùng Outlet để render các component con trong <Route />*/}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
