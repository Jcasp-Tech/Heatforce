import React, { Suspense, useEffect, useRef } from "react";
import AnimatedText from "../theme/effects/AnimatedText";
import styles from "../../styles/Pages/SecondSection.module.scss";
import AnimatedHeading from "../theme/effects/AnimatedHeading";
// import Image from "next/image";
import dynamic from "next/dynamic";
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/router';

// gsap.registerPlugin(useGSAP);
// gsap.registerPlugin(ScrollTrigger);
// import SecondBannerFormDiv from "./SecondBannerFormDiv";
const BackgroundBubblesDesktop = dynamic(() => import("../BackgroundBubblesDesktop"), {
  suspense: true,ssr:false
});
const BackgroundBubblesMobile = dynamic(() => import("../BackgroundBubblesMobile"), {
  suspense: true,ssr:false
});

// const SecondSection = ({scrollToPostCode }) => {
const SecondSection = () => {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const secDivRef1 = useRef<HTMLDivElement>(null);
  const secDivRef2 = useRef<HTMLDivElement>(null);
  // const videoOrderRef=useRef<number>(0)
  const router = useRouter();


  useEffect(() => {

    const handleScroll = () => {
      const animateDiv = (
        ref: React.MutableRefObject<HTMLDivElement | null>
      ) => {
        if (ref.current) {
          const top = ref.current.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (top < windowHeight * 0.75) {
            ref.current.classList.add("show");
          } else {
            ref.current.classList.remove("show");
          }
        }
      };

      animateDiv(mainDivRef);
      animateDiv(secDivRef1);
      animateDiv(secDivRef2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

// useEffect(()=>{
// const step1VideoRef=document.getElementById("step1Video")
// const step2VideoRef=document.getElementById("step2Video")
// const step3VideoRef=document.getElementById("step3Video")
//   const videoRefs = [step1VideoRef, step2VideoRef, step3VideoRef];
//   let videoIndex = 0;
//   const playNextVideo = () => {
//     console.log('playNextVideo',videoRefs[videoIndex]?.currentTime,videoRefs[videoIndex]?.duration,videoIndex)
//     if ( videoRefs[videoIndex] && videoIndex && videoRefs[videoIndex]?.currentTime === videoRefs[videoIndex]?.duration) {
//       videoRefs[videoIndex]?.pause();
//       videoIndex = (videoIndex + 1) % videoRefs.length;
//       videoRefs[videoIndex]?.currentTime=0
//       videoRefs[videoIndex]?.load();
//       videoRefs[videoIndex]?.play();
//     }
//   };
//   videoRefs.forEach((videoRef,index) => {
//     videoRef?.addEventListener("ended", playNextVideo);
//     if(index===0){
//       videoRef?.play();
//     }
//     // videoRef?.play();
//   });
// },[])




// series video play logic
// useEffect(()=>{
//   console.log("videoOrderRef.current",videoOrderRef.current)
//   let step1VideoRef=document.getElementById("step1Video")
//   let step2VideoRef=document.getElementById("step2Video")
//   const step3VideoRef=document.getElementById("step3Video")
//   // step1VideoRef?.play();
//   step1VideoRef?.addEventListener("ended", () => {
//     // const step2VideoRef=document.getElementById("step2Video")
//     // (step3VideoRef as HTMLVideoElement)?.load();
//     (step2VideoRef as HTMLVideoElement)?.play();
//     videoOrderRef.current=1
//   })

//   step2VideoRef?.addEventListener("ended", () => {
//     (step3VideoRef as HTMLVideoElement )?.play();
//     // (step1VideoRef as HTMLVideoElement)?.load(); 

//     videoOrderRef.current=2
//   })


// step3VideoRef?.addEventListener("ended", () => {
//   // (step2VideoRef as HTMLVideoElement)?.load();
//   (step1VideoRef as HTMLVideoElement)?.play();

//   videoOrderRef.current=0


// })
// console.log(videoOrderRef.current)
// },[videoOrderRef.current])
// useEffect(()=>{
// if(videoOrderRef.current===0){
//   let step1VideoRef=document.getElementById("step1Video")
//   if(step1VideoRef){
    
//     (step1VideoRef as HTMLVideoElement)?.play();
//     videoOrderRef.current=1
//   }
// }
// },[videoOrderRef.current])



// scrolltrigger to play video
// useGSAP(() => {
//   gsap.context(() => {
//     ScrollTrigger.create({
//       trigger: '.scrollTrigger_div',
//       // start:"top 80%",
//       // markers:true,
//   start: "bottom bottom",
//       onEnter: () => {
//         let step1VideoRef=document.getElementById("step1Video")
//   if(step1VideoRef){
    
//     (step1VideoRef as HTMLVideoElement)?.play();
//     videoOrderRef.current=1
//   }
//       },
//     })
//   })
// })
  return (
    <div className={`${styles.secondBannerDiv} container-xl`} >
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.desktopView}>
          <BackgroundBubblesDesktop />
        </div>
        <div className={styles.mobileView}>
          <BackgroundBubblesMobile />
        </div>
      </Suspense>
      <div className={styles.secondBannerParentDiv} >
        <div>
          <AnimatedHeading className={styles.bannerHeader}>
          Get the best possible prices in just 3 steps
          </AnimatedHeading>
        </div>
        <div className={styles.secondBannerContent}>
          {/* <SecondBannerFormDiv {...{ isSaveQuoteAvailable, setIsSaveQuoteAvailable, postCode, setPostCode, scrollToPostCode }} /> */}
          {/* <div
            className={`${styles.secdiv} ${styles.gifAnimDiv}`}
            ref={secDivRef1}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: "0.5",
              }}
            ></div>
            <div>
              <div>
                <AnimatedText
                  className={styles.secdivFooter}
                  style={{ color: "white", textShadow: ' 1px 2px black' }}
                >
                  <b >Draw around your roof</b>
                </AnimatedText>
              </div>
              <div className="py-6">
                <AnimatedText>
              <div className="buttonDiv">
                <div className="getstartede-button d-flex justify-content-center removeBefore mb-3 bg-primary rounded-pill">
                  <div className='d-flex justify-content-center my05 w-100'>
                      <div className="getstarted-button w-100"
                          onClick={() => {
                      scrollToPostCode();
                    }}>
                          <div className="getstartedbtn-shadow"></div>
                          <AnimatedText>
                            <span>Get Started</span>
                          </AnimatedText>
                      </div>
                    </div>
                  </div>
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div> */}
          <div className={`${styles.secondBanner2div} scrollTrigger_div`} ref={secDivRef2}>
            <div className={styles.secondBannerInndiv}>
              <div  className={styles.secondBannerTitleDiv}  >
               <b>Step 1
                </b> 
              </div>
            <div className={styles.videoDiv}>

          <video  id="step1Video"  poster={"/flowVideos/Step_1.jpeg"} muted playsInline  autoPlay  loop preload="auto"   >
    <source src="flowVideos/Step_1.mp4" id="step1VideoMp4Source" type="video/mp4"  />
    Your browser does not support the video tag.
</video>
</div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', alignItems: 'start', flexDirection: 'column' }}>

               <AnimatedText className={styles.secondBannerFooter}>
                  <b>Answer simple questions about your roof</b>
            </AnimatedText>
            {/* <Link href="/survey/">
              </Link> */}
                <AnimatedText>
                  <div className="buttonDiv ">
                <div className="getstartede-button d-flex justify-content-center removeBefore mb-3 bg-transparent rounded-pill z-0">
                  <div className='d-flex justify-content-center my05 w-100'>
                        <div className="getstarted-button w-100"
                          // onClick={() => {scrollToPostCode();}}
                          onClick={() => {router.push(`/survey`);}}
                          >
                          <div className="getstartedbtn-shadow "></div>
                          <AnimatedText>
                            <span className="text-nowrap">Get Started</span>
                          </AnimatedText>
                    </div>
                  </div>
                    </div>
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>

          <div className={styles.secondBanner2div} ref={secDivRef2}>
            <div className={styles.secondBannerInndiv}>
              <div  className={styles.secondBannerTitleDiv}  >
               <b>Step 2
                </b>
              </div>
            <div className={styles.videoDiv}>

              <video  id="step2Video" poster={"/flowVideos/Step_2.jpeg"} muted playsInline autoPlay loop style={{padding:'10px',borderRadius:"20px"}}  preload="auto">
    <source src="flowVideos/Step_2.mp4" id="step2VideoMp4Source" type="video/mp4"/>
    Your browser does not support the video tag.
</video>
</div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', alignItems: 'start', flexDirection: 'column' }}>

               <AnimatedText className={styles.secondBannerFooter}   >
                  <b>Draw around your roof</b>
            </AnimatedText>
              {/* <Link href="/survey/">
              </Link> */}
                <AnimatedText style={{marginTop:"32px"}}>
                  <div className="buttonDiv">
                <div className="getstartede-button d-flex justify-content-center removeBefore mb-3 bg-transparent rounded-pill  z-0">
                  <div className='d-flex justify-content-center my05 w-100'>
                        <div className="getstarted-button w-100"
                          // onClick={() => {scrollToPostCode();}}
                          onClick={() => {router.push(`/survey`);}}
                          >
                          <div className="getstartedbtn-shadow"></div>
                          <AnimatedText>
                          <span className="text-nowrap">Get Started</span>
                          </AnimatedText>
                    </div>
                  </div>
                    </div>
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>

          <div className={styles.secondBanner2div} ref={secDivRef2}>
            <div className={styles.secondBannerInndiv}>
              <div className={styles.secondBannerTitleDiv}  >
               <b>Step 3
                </b>
              </div>
              <div className={styles.videoDiv}>
              <video  id="step3Video" poster={"/flowVideos/step_3_2.jpeg"} muted playsInline  autoPlay loop preload="auto">
    <source src="flowVideos/step_3_2.mp4" id="step3VideoMp4Source" type="video/mp4"/>
    Your browser does not support the video tag.
</video>
</div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', alignItems: 'start', flexDirection: 'column' }}>

               <AnimatedText className={styles.secondBannerFooter}>
                  <b>Get your solar quote & savings report</b>
            </AnimatedText>
                <AnimatedText>
                  <div className="buttonDiv">
                <div className="getstartede-button d-flex justify-content-center removeBefore mb-3 bg-transparent rounded-pill z-0">
                  <div className='d-flex justify-content-center my05 w-100'>
                {/* <Link href="/survey/">
                </Link> */}
                        <div className="getstarted-button w-100"
                          // onClick={() => {scrollToPostCode();}}
                          onClick={() => {router.push(`/survey`);}}
                          >
                          <div className="getstartedbtn-shadow"></div>
                          <AnimatedText>
                          <span className="text-nowrap">Get Started</span>
                          </AnimatedText>
                    </div>
                  </div>
                    </div>
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SecondSection;
