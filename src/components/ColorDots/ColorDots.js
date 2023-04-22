import React, { useState } from 'react';
import styles from './ColorDots.module.scss';

const ColorDots = ({ color = '#E1E1E1', size = 16 }) => {
  return <p className={styles.colorDots} style={{ backgroundColor: color, height: size + 'px', width: size + 'px'}}></p>
};

export default ColorDots;
