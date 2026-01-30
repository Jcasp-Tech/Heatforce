import React from "react";
import style from ".././styles/Pages/FourthSection.module.scss";
import Image from "next/image";

const SolarDetailsPage = () => {
  return (
    <div className={`${style.solarDetailsContent} ${style.popupContent}`}>
      <div className={style.bannerContentPanelImgPopup}>
        <Image quality={100} 
          src="/images/Solar-Standalone.png"
          alt="panel"
          className={style.bannerContentPanelImgPopup}
          width={250}
          height={400}
          loading="lazy"
        />
      </div>
      <div className={style.solarDetailsText}>
        <div className={style.solarName}>
          <Image
            src="/images/logo1.png"
            alt="GivEnergy"
            className={style.imageLogo}
            width={250}
            height={400}
          />
        </div>
        <p className={style.phoneSubtitle}>430W Bifacial Double Glass Panel (Black Pro)</p>
        <p className={style.solarDescription}>
          With a module conversion efficiency of 22%, this bi-facial solar panel ensures maximum energy output from every ray of sunlight. The panel features a positive power tolerance of 0/+5W, guaranteeing you always get the power you need. Certified to withstand challenging environmental conditions, the DAS Solar PV Panel is built for durability and reliability. Its sleek all-black design not only enhances its aesthetic appeal but also allows it to blend seamlessly with any roof.
        </p>
        {/* <div className={style.productInfo}>
          <h3>Product Information</h3>
          <p>
            Additional product details can be listed here, providing more
            insights into the features and specifications of the solar panels.
          </p>
        </div> */}
        <div className={style.downloadLink}>
          {/* <a
            href="/path-to-your-file.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a> */}
          <div className={style.fileImageLogo}>
            <div style={{ backgroundColor: "#e4e7eb" }} className={`rightsideCard2`}
              onClick={() => window.open(`/pdf/samplesolarpdfnew.pdf`)}>
              <div className={`rightsideCardProductDiv`}>
                <Image quality={100} className={`hFill `} width={45} height={45} src="/images/resultPopupModule/_Path_.webp" alt="product" />
              </div>
              <div>
                <div className={`text1 `}>{'DAS solar 430W pdf'}</div>
                <div className={`text2 `}>Click to view</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarDetailsPage;
