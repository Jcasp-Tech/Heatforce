import React, { useEffect, useState } from "react";
import Trustpilot from "./trustpilot";
import styles from '../../styles/Pages/FirstSection.module.scss';
import Cursor from '../Cursor';
import AnimatedText from "../theme/effects/AnimatedText";
import Image from "next/image";
import { useRouter } from 'next/router';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PostCodeFormValidateSchema, PostFormInputs } from "@/schemas/postCodeFormSchema";
import NewtrustPilotDiv from "./NewtrustPilotDiv";
import FirstSectionFormCard from "./FirstSectionFormCard";
// import NewtrustPilotDiv from "./NewtrustPilotDiv";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { event, EVENTENUMS } from "../Pixel/facebook/lib/fpixel";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);





const FirstSection = ({ defaultLoading}) => {
  const { handleSubmit, formState, register, setValue, } =
    useForm<PostFormInputs>({
      resolver: yupResolver(PostCodeFormValidateSchema),
    });
  const router = useRouter();
  const [, setIsPostCode] = useState(false);
  const [isSaveQuoteAvailable, setIsSaveQuoteAvailable] = useState(false);
  const [postCode, setPostCode] = useState('');

  const classes = `${styles.firstBannerImg} ${styles.desktopView} ${styles.leftToRight}`;
  // const classes2 = `${styles.firstBannerHeader} ${styles.animatedHeading} ${styles.testSpanTop}`;
  // const classes3 = `${styles.firstBannerHeader} ${styles.animatedHeading} ${styles.testSpanCenter}`;

  useGSAP(() => {
    if(!defaultLoading){
  
      
      
    gsap.context(() => {
      
     
    })
      const t= gsap.timeline({
        repeat:-1,
        delay:3,
        paused:true
      })
      t.to(".img1",{opacity:0,duration:5})
      .to('.img2',{opacity:0,duration:5})
      .to('.img3',{opacity:0,duration:5},"a")
      .to('.img1',{opacity:1,duration:3},"a")
      const t1 = gsap.timeline({
        onComplete: () => {
          t.play()
        }
      })
      t1.to('.loaderWrapper',{display:"none",duration:1,pointerEvents:"none"})
      
     
  }
  
  },[defaultLoading])
  //declare submit function not async
  const onSubmit = (() => {
    event(EVENTENUMS.FindLocation);
    setTimeout(() => {
      window.localStorage.setItem('postcode', postCode)
      router.push(`/survey`)
      
    },200)
    window.scrollTo(0, 0);

  })
  const handleChange = (value: string) => {
    setPostCode(value.toUpperCase());
    // setIsCookies(false);
    localStorage.removeItem('saveQuotes');
    setValue('postCode', value.toUpperCase());
  };
  const isSaveQuoteAvailableFunction = () => {
    if (typeof window !== 'undefined') {
      let text = window.localStorage.getItem("saveQuotes");
      setIsSaveQuoteAvailable(!!(text && text !== '' && text !== null && text !== undefined));
      return
    }
    setIsSaveQuoteAvailable(false);
  };
  const isPostcodeAvailable = () => {
    if (typeof window !== 'undefined') {
      let text = window.localStorage.getItem("postcode");
      if (typeof text === 'string') {

        // setPostCode(text?.toUpperCase());
        // setValue('postCode', text.toUpperCase());

      }
      setIsPostCode(!!(text && text !== '' && text !== null && text !== undefined));
    }
    setIsPostCode(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".firstBannerHeader") as HTMLElement;
      const text = document.querySelector(".firstBannerText") as HTMLElement;

      if (header && text) {
        const scrollPosition = window.scrollY + window.innerHeight;

        if (header.getBoundingClientRect().top <= scrollPosition) {
          header.classList.add("visible");
        }
        if (text.getBoundingClientRect().top <= scrollPosition) {
          text.classList.add("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once initially to check visibility on load



    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    isPostcodeAvailable();
    isSaveQuoteAvailableFunction();

  }, []);
  const restartQuoteFunction = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("saveQuotes");
      window.localStorage.removeItem("postcode");
      window.localStorage.removeItem("WebLeadType");
      setIsSaveQuoteAvailable(false);
      setIsPostCode(false)
      setPostCode('')

    }
  }

  const finishQuoteFunction = () => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("saveQuotes") && typeof window.localStorage.getItem("saveQuotes") === 'string') {
      router.push(`${window.localStorage.getItem("saveQuotes")}`)
    }

  }

  return (
    <>
    <div className=" container-xl  position-relative parent_header " style={{    overflow:'hidden',background: "linear-gradient(to top right, #F6E51B, #0F3B59, #0A1E34)"}}  >
        <Cursor blob={styles.blob} />
      <div className={` container-xl relative ${styles.firstBannerDiv}`} style={{ zIndex: "0" }} >
        {/* <div className={styles.firstBannerHoverglow} ref={glowref}></div> */}

          <div  style={{pointerEvents:'none'}}  className="firstSectionImageChangeAnimation lefttoright" >
            <Image  
            loading="eager"
              src="/images/Slider1.jpg"
              alt="Hero Slider 1"
              className={ ` img1 ${classes}`}
              width={800}
              height={600}
              style={{ position:'relative',zIndex:'5',width:'100%',height:'100%',pointerEvents:'none'}}
            />
            <Image 
            loading="eager"
              src="/images/slider-2.jpg"
              alt="Hero Slider 2"
              className={` img2 ${classes}`}
              width={800}
              height={600}
              style={{position:'absolute',zIndex:'4',width:'100%',height:'100%',top:"0",left:"0",pointerEvents:'none'}}
            />
            <Image 
            loading="eager"
              src="/images/slider-3.jpg"
              alt="Hero Slider 3"
              className={` img3 ${classes}`}
              width={800}
              height={600}
              style={{position:'absolute',zIndex:'3',width:'100%',height:'100%',top:"0",left:"0",pointerEvents:'none'}}
            />
          </div>


        <FirstSectionFormCard  {...{
          register,
          formState, handleChange, setPostCode, postCode, isSaveQuoteAvailable, handleSubmit, onSubmit, finishQuoteFunction, restartQuoteFunction
        }} />


      </div>
      </div>
      <div className=" desktop-review-div" >
        <div className="trustpilot-div">
          <div className="inner-div w-100 d-flex justify-content-center">
            <AnimatedText>
              <span
                className="desktop-view ourCustomersSayFont h-100 text-nowrap"
                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
              >
                <div className="d-flex align-items-center">
                  Our Customers say{"    "}

                </div>
              </span>
            </AnimatedText>
            <Trustpilot initialData={null} />
          </div>
        </div>
      </div>
      <div className="mobile-review-div">

        <NewtrustPilotDiv initialData={null} />
      </div>

    </>
  );
};

export default FirstSection;
