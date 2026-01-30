import React from "react";
import style from ".././styles/Pages/FourthSection.module.scss";
import Image from "next/image";

const PhonePopup = () => {
  return (
    <div className={`${style.solarDetailsContent} ${style.popupContent}`}>
      <div className={style.bannerContentPhoneImgPopup}>
        <Image
          src="/images/phone.webp"
          alt="phone"
          className={style.bannerContentPhoneImgPopup}
          width={400}
          height={400}
        />
      </div>
      <div className={style.solarDetailsText}>
        <div className={style.solarName}>
          <Image
            src="/images/GivEnergy.png"
            alt="GivEnergy"
            className={style.imageLogo}
            width={250}
            height={400}
          />
        </div>
        <p className={style.phoneSubtitle}>Smart Home Monitoring</p>
        <p className={style.solarDetailsText247Monitor}>
          Monitor and manage your energy usage from your computer and
          smartphone. The GivEnergy app allows you to easily check in on your
          home energy system - as well as making any ad-hoc changes at the top
          of your screen.
        </p>
        <p className={style.solarDetailsText247Monitor}>
          A lighter-weight companion to our powerful monitoring portal, the
          GivEnergy app is built for quick, easy access to your system on the
          move.
        </p>
        <p className={style.solarDetailsText247Monitor}>
          So, you can grab basic information about your home energy demand,
          solar PV generation, grid import energy, and GivEnergy battery usage.
          You can perform simple actions based on where the day is taking you.
        </p>
        <p className={style.solarDetailsText247Monitor}>And, in turn, you can continually save and optimize.</p>
        {/* Links for downloading the app */}
        {/* <div className={style.downloadAppLinks}>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/playstore.webp"
              alt="Get it on Google Play"
              className={style.webstore}
              width={200}
              height={60}
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/appstore.webp"
              alt="Download on the App Store"
              className={style.webstore}
              width={200}
              height={60}
            />
          </a>
        </div> */}
      </div>
      <div className={style.bannerContentPhoneImgPopup}>
        <Image
          src="/images/PC.webp"
          alt="phone"
          className={style.bannerContentPhoneImgPopup}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default PhonePopup;
