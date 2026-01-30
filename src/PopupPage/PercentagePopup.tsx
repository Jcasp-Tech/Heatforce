import React from "react";
import style from ".././styles/Pages/FourthSection.module.scss";
import Image from "next/image";


const PercentagePopup = () => {
  return (
    <div className={`${style.solarDetailsContent} ${style.popupContent}`}>
      <div className={style.solarDetailsText}>
        <p className={style.percentageSubtitle}>
          Split the cost of your solar system to your needs
        </p>
        <p className={style.percentageDescription}>
          To maximize your savings we recommend paying for your solar system as soon as you can in order to benefit fully from your export tariff returns.
        </p>
        <p className={style.percentageDescription}>
          We believe everyone should have the opportunity to benefit from solar energy. That&apos;s why we offer flexible financing options, allowing you to spread the cost of your solar installation over 60 or 120 months. Get started now and maximize your savings through export tariffs while enjoying the benefits of clean energy.
        </p>

        <p className={`${style.percentageDescription} } `} >
          {`*Representative example. Cash price £6,936.00, less a deposit of £0. Total loan amount £10,770.02. Repayable by 120 monthly repayments of £145. Total charge for credit £3,834.02. Total amount repayable £10,770.02 (includes £0 deposit). Interest rate 9.9% per annum fixed. Representative APR 9.9%`}
        </p>
      </div>
      <div className={style.bannerContentPercentageImgPopup}>
        <Image
          src="/images/Percentage.png"
          alt="panel"
          className={style.bannerContentPercentageImgPopup}
          width={250}
          height={400}
        />
      </div>
    </div>
  );
};

export default PercentagePopup;
