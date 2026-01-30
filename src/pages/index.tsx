import React, { useEffect, useState } from 'react';
import Navbar from '@/components/homePageComponents/Navbar';
import FooterSection from '@/components/homePageComponents/FooterSection';
import SolarDetailsPage from '@/PopupPage/SolarDetails';
import PhonePopup from '@/PopupPage/PhonePopup';
import PercentagePopup from '@/PopupPage/PercentagePopup';
import BatteryPopup from '@/PopupPage/BatteryDetails';
import styles from "../styles/Pages/FourthSection.module.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomePage from '@/components/homePageComponents';

interface PopupContent {
  component: React.ElementType<any> | null;
  props: any;
}

const Home = () => {
  const [popupContent, setPopupContent] = useState<PopupContent>({
    component: null,
    props: {},
  });
  const [defaultLoading]=useState(false)

  const handleLearnMoreClick = (popupType: string) => {
    switch (popupType) {
      case "solar":
        setPopupContent({
          component: SolarDetailsPage,
          props: { onClose: handleClosePopup },
        });
        break;
      case "phone":
        setPopupContent({
          component: PhonePopup,
          props: { onClose: handleClosePopup },
        });
        break;
      case "percentage":
        setPopupContent({
          component: PercentagePopup,
          props: { onClose: handleClosePopup },
        });
        break;
      case "battery":
        setPopupContent({
          component: BatteryPopup,
          props: { onClose: handleClosePopup },
        });
        break;
      default:
        setPopupContent({ component: null, props: {} });
    }
  };

  const handleClosePopup = () => {
    setPopupContent({ component: null, props: {} });
  };


  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
  
      <Navbar />

      <HomePage popupContent={popupContent} defaultLoading={defaultLoading}  handleLearnMoreClick={handleLearnMoreClick} />


      <FooterSection />

      <div className={`${styles.myPopup} container-xl `}>
        {popupContent?.component && (
          <div className={`${styles.popup} ${styles.open}`}>
            <div className={styles.popupContent}>
              <button className={styles.closeButton} onClick={handleClosePopup}>
                x
              </button>
              <popupContent.component {...popupContent.props} />
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default Home;
