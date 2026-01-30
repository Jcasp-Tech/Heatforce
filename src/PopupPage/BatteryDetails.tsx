import React, { useState } from 'react';
import style from '.././styles/Pages/FourthSection.module.scss';
import Image from 'next/image';

const BatteryPopup = () => {
  const [selectedSliderImage, setSelectedSliderImage] = useState<any>(null);
  const [selectedSliderImagePath, setSelectedSliderImagePath] = useState<any>(
    '/images/battery-img-1.png'
  );

  console.log('selectedSliderImage', selectedSliderImage);
  return (
    <div className={`${style.solarDetailsContent} ${style.popupContent}`}>
      {/* <div className={style.bannerContentImgBatteryDivPopup}>
        <img
          src="/images/GivEnergyBattery.webp"
          alt="battery"
          className={style.bannerContentImgBatteryDivPopup}
          width={250}
          height={400}
        />
      </div> */}
      <div className={`${style.solarImgDiv}`}>
        <div className={`${style.bannerContentImgBatteryDivPopup1}`}>
          <Image  
            className={style.bannerContentImgBatteryDivPopup}
            width={200}
            height={200}
            style={{
              objectFit: 'contain',
              mixBlendMode: 'multiply',
            }}
            src={`${selectedSliderImagePath}`}
            alt="product"
          />
        </div>
        <div className={`${style.solarSmallImgDiv}`}>
        <div
            onClick={() => {
              setSelectedSliderImage(2),
                setSelectedSliderImagePath('/images/battery-img-1.png');
            }}
          >
            <Image quality={100} 
              className={``}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
              }}
              src={'/images/battery-img-1.png'}
              alt="product"
            />
          </div>
          <div
            onClick={() => {
              setSelectedSliderImage(1),
                setSelectedSliderImagePath('/images/battery-img-2.png');
            }}
          >
            <Image quality={100} 
              className={``}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
              }}
              src={'/images/battery-img-2.png'}
              alt="product"
            />
          </div>
          <div
            onClick={() => {
              setSelectedSliderImage(1),
                setSelectedSliderImagePath('/images/battery-img-3.png');
            }}
          >
            <Image quality={100} 
              className={``}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
              }}
              src={`/images/battery-img-3.png`}
              alt="product"
            />
          </div>
          <div
            onClick={() => {
              setSelectedSliderImage(3),
                setSelectedSliderImagePath('/images/battery-img-4.jpg');
            }}
          >
            <Image quality={100} 
              className={``}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
              }}
              src={`/images/battery-img-4.jpg`}
              alt="product"
            />
          </div>
        </div>
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
        <h2 className={style.batterySubtitle}>Home Battery Storage</h2>
        <p className={style.solarDescription}>
          Save up to 85% on your energy bills. With a GivEnergy home battery
          storage system, you can keep your home running at a minimal price.
          Even better, you&apos;ll be running on green, sustainable energy that
          cuts carbon as well as costs.
        </p>
        <p>Maximize your tariff</p>
        <p>
          If you have an off-peak, Economy 7 or similar tariff, you can utilise
          this to the best of its capability. You can charge at cheap rate. Your
          battery will discharge when energy is more expensive, minimising your
          import from the grid. This is known as load shifting.
        </p>
        {/* <div className={style.productInfo}>
          <h3>Product Information</h3>
          <p>
            Additional product details can be listed here, providing more
            insights into the features and specifications of the solar panels.
          </p>
        </div> */}
        <div className={style.fileImageLogo}>
          <div
            style={{ backgroundColor: '#e4e7eb' }}
            className={`rightsideCard2`}
            onClick={() => window.open(`/pdf/giv_energy_giv_bat.pdf`)}
          >
            <div className={`rightsideCardProductDiv`}>
              <Image quality={100} 
                className={`hFill `}
                width={45}
                height={45}
                src="/images/resultPopupModule/_Path_.webp"
                alt="product"
              />
            </div>
            <div>
              <div className={`text1 `}>{'Giv-Battery pdf'}</div>
              <div className={`text2 `}>Click to view</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.bannerContentImgBatteryDivPopup}>
        <Image
          src="/images/BatteryMobile.webp"
          alt="BatteryMobile"
          className={style.bannerContentImgBatteryDivPopup}
          width={250}
          height={400}
        />
      </div>
    </div>
  );
};

export default BatteryPopup;
