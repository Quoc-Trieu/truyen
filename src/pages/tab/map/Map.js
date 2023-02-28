import React, { useEffect, useState } from 'react'
import styles from "./Map.module.scss";
import Header from "./../../../components/Header/Header";
import MapL from './components/mapL';
import MapV from './components/mapV';
import { FaLocationArrow } from 'react-icons/fa'

const Map = () => {
  const [tabValue, setTabValue] = useState(0);
  const locationBtn = document.querySelector('#container .my-location')
  useEffect(() => {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      // Set giá trị margin top là 10 nếu là iOS
      // document.querySelector("#container .WrapperBtn").style.marginTop = "80px";
    } 
  })
  return (
    <div className={styles.mapContainer}>
      <Header title="Bản đồ" name="Nguyễn Văn A" />
      <div id='container'>
        <div className='WrapperBtn'>
          <div
            className={`btn ${tabValue == 0 ? 'active' : ''}`}
            onClick={() => {
              setTabValue(0)
              locationBtn.style.background = '#fff'
              locationBtn.style.color = '#000'
            }}
          >
            Lô
          </div>
          <div
            className={`btn ${tabValue == 1 ? 'active' : ''}`}
            onClick={() => {
              setTabValue(1)
              locationBtn ? locationBtn.style.background = '#fff' : console.log('false');
              locationBtn ? locationBtn.style.color = '#000' : console.log('false');
            }}
          >
            Vùng cạo
          </div>
        </div>
        <div className='my-location'>
          <FaLocationArrow />
        </div>
        {
          tabValue == 0 ? <MapL /> : <MapV />
        }
      </div>
    </div>
  )
}

export default Map