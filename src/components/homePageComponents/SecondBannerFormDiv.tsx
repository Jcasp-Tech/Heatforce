import React, { useEffect, useRef, useState } from 'react'
import AnimatedText from '../theme/effects/AnimatedText';
import { useRouter } from 'next/router';
import styles from "../../styles/Pages/SecondSection.module.scss";
import Image from 'next/image';


const SecondBannerFormDiv = ({isSaveQuoteAvailable, setIsSaveQuoteAvailable,postCode, setPostCode,scrollToPostCode}) => {
  const mainDivRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

    const [, setIsPostCode] = useState(false);
    const isSaveQuoteAvailableFunction = () => {
        if (typeof window !== 'undefined') {
          let text = window.localStorage.getItem("saveQuotes");
          setIsSaveQuoteAvailable(!!(text && text !== '' && text !== null && text !== undefined));
          return
        }
        setIsSaveQuoteAvailable(false);
      };
      const onSubmit = (()=>{
        router.push(`/survey`)
        window.localStorage.setItem('postcode', postCode)
      })
    const restartQuoteFunction=()=>{
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem("saveQuotes");
          window.localStorage.removeItem("postcode");
          window.localStorage.removeItem("WebLeadType");
          setIsSaveQuoteAvailable(false);
          setIsPostCode(false)
          setPostCode('')
    
        }
      }
    
      const finishQuoteFunction=()=>{
        if (typeof window !== 'undefined'&& window.localStorage.getItem("saveQuotes") && typeof window.localStorage.getItem("saveQuotes")==='string' ) {
          router.push(`${window.localStorage.getItem("saveQuotes")}`)
        }
        
      }
      const isPostcodeAvailable = () => {
        if (typeof window !== 'undefined') {
          let text = window.localStorage.getItem("postcode");
          if(typeof text==='string')
          {
    
            // setPostCode(text?.toUpperCase());
    
          }
          setIsPostCode(!!(text && text !== '' && text !== null && text !== undefined));
        }
        setIsPostCode(false);
      };
      useEffect(() => {
        isPostcodeAvailable();
        isSaveQuoteAvailableFunction();
    
      }, []);
  return (
    <div className={styles.secondBanner2div} ref={mainDivRef}>
    <div className={styles.secondBannerInndiv}>
    <div className={styles.secondBannerInndivsubDiv1} >
    <span className={styles.secondBannerInndivHeader}>
          <AnimatedText>
          Get an <b>unbeatable</b> online solar price in less than <b> <u> 60 seconds </u></b>
          </AnimatedText>
        </span>
        <span className={styles.secondBannerText}>
          <AnimatedText>
          Get an instant online estimate, plus a free solar design based on 3D mapping technology. Prices from £3,650.
          </AnimatedText>
        </span>

        <AnimatedText>
          <div className="d-flex justify-content-start  align-items-center"  style={{height:'100%',padding:'0px 10px'}} >
          {      isSaveQuoteAvailable ? <div className="" style={{width:'100%',display:'flex',gap:'10px'}} >

          <div className="buttonDiv w-auto p-0">
                <div className="getstartede-button d-flex justify-content-center removeBefore bg-transparent rounded-pill w-100 mw-100 mh-100 z-0">
                    <div className='d-flex justify-content-center my05 my2px w-100'>
                      <button className="restart-quote-second getstarted-button w-100 text-nowrap bg-white py-1" onClick={() => { restartQuoteFunction(); }}>Restart Quote</button>
                    </div>
                </div>
            </div>

            <div className="buttonDiv w-auto p-0">
                <div className="getstartede-button d-flex justify-content-center removeBefore bg-transparent rounded-pill w-100 mw-100 mh-100 z-0">
                    <div className='d-flex justify-content-center my05 my2px w-100'>
                      <div className="finish-quote-second getstarted-button w-100 text-nowrap py-1" onClick={() => { finishQuoteFunction(); }}>Finish Quote</div>
                    </div>
                </div>
            </div>



</div>:<div className={styles.firstBannerInputBox}>
          <div className={styles.firstInputIcon}>
          <Image quality={100} 
            src="/images/location.webp"
            className="img"
            alt="location"
            width={50}
            height={50}
            loading="lazy"

          />
          </div>
          <div className={styles.firstInputText}>

            <input
              type="text"
              value={postCode}
              style={{textTransform:'uppercase'}}
              placeholder="Enter Postcode"
              onChange={(e)=> setPostCode(e.target.value)}
              id='postCode2'
          
              />
          </div>

          <div className="buttonDiv w-auto p-0">
            <div className="getstartede-button d-flex justify-content-center removeBefore bg-transparent rounded-pill w-100 mw-100 mh-100 my-auto z-0">
              <div className='d-flex justify-content-center my05 my2px w-100'>
                <div className={`${styles.getStartedButtonSecond} getstarted-button-ipbox w-100 py-1 px-2 cssanimation fadeInBottom`}
                onClick={() => onSubmit()}>
                  <div className={styles.getStartedbtnShadow}></div>
                      <span className="getStartedButton animated-text visible w-100 text-nowrap" >Get Started</span>
                    {/* <AnimatedText>
                    </AnimatedText> */}
                </div>
                
              </div>
            </div>
          </div>
        </div>}
        </div>
      </AnimatedText>
    </div>
      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'start',flexDirection:'column',height:'100%'}}>
      <div>
        <AnimatedText className={styles.secondBannerFooter}>
        {      isSaveQuoteAvailable ? <b  >Continue with your free solar application</b>: <b  >Answer simple questions about your roof</b>}
        </AnimatedText>
      </div>
        <AnimatedText>
          <div className="buttonDiv">
            <div className="getstartede-button d-flex justify-content-center removeBefore mb-3 bg-transparent rounded-pill z-0">
              <div className='d-flex justify-content-center my05 w-100'>
                <div className="getstarted-button cssanimation fadeInBottom w-100"
                onClick={() => {
            
            scrollToPostCode('samediv');
                      

          }}>
                  <div className="getstartedbtn-shadow"></div>
                  <AnimatedText>
                  {      isSaveQuoteAvailable ? <span className="getstartedbtn-txt text-nowrap">Finish Quote</span>: <span className="getstartedbtn-txt text-nowrap">Get Started</span>}
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>
    </div>
  </div>
  )
}

export default SecondBannerFormDiv