import React from "react";
import Nav from '../../components/Nav/Nav'
import { Outlet } from 'react-router-dom'

import styles from "./Home.module.scss";

function Home() {
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
