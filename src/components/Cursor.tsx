import React, { useEffect } from "react";
import styles from '../styles/Pages/FirstSection.module.scss';

const Cursor = (props: any) => {
  useEffect(() => {
    const cursor: any = document.querySelector(`.${styles.blob}`);
    const firstBannerDiv = document.querySelector(`.parent_header`);

    if (!cursor || !firstBannerDiv) return;

    const handleMouseMove = (e) => {
      if (!firstBannerDiv.contains(e.target)) {
        cursor.style.transform = 'translate(-50%, -50%)';
      } else {
        let translateX, translateY;

        if (window.matchMedia('(max-width: 768px)').matches) {
          translateX = '125%';
          translateY = '130%';
        } else if (window.matchMedia('(max-width: 1024px)').matches) {
          translateX = '150%';
          translateY = '130%';
        } else {
          translateX = '150%';
          translateY = '130%';
        }

        cursor.style.transform = `translate3d(calc(${e.clientX}px - ${translateX}), calc(${e.clientY}px - ${translateY}), 0px)`;
      }
    };

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <div className={props.blob}></div>;
};

export default Cursor;
