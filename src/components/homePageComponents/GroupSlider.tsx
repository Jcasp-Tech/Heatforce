import React, { useEffect, useRef } from 'react';
import Trustpilot from "./trustpilot/trustreview5star";
import styles from '../../styles/Pages/GroupSlider.module.scss';
import AnimatedHeading from '../theme/effects/AnimatedHeading';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
const GroupSlider = ({trustpilot}) => {
  const headerRef = useRef(null);
  const awardsRef = useRef(null);
  useGSAP(() => {
    gsap.context(() => {
        gsap.from(".awards-img", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".groupSliderHeading",
              start: "top 70%",
           
            }
          })
    })
})
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    if (awardsRef.current) {
      observer.observe(awardsRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
      if (awardsRef.current) {
        observer.unobserve(awardsRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={`${styles.trustBannerDiv} container-xl `}>
        <div>
            <AnimatedHeading className={` groupSliderHeading ${styles.bannerHeaderShort}`}>Our group</AnimatedHeading>
        </div>
        <div ref={awardsRef} className={styles.awardsDiv}>
          <div className={styles.awrdsImgDiv}>
            <Image quality={100} src="/images/ourgroup1.webp" width={200} height={100} alt="awards" loading="lazy" className="awards-img" />
          </div>
          <div className={styles.awrdsImgDiv}>
            <Image quality={100} src="/images/ourgroup2.webp" width={250} height={100} alt="awards" loading="lazy" className="awards-img" />
          </div>
          <div className={styles.awrdsImgDiv}>
            <Image quality={100} src="/images/ourgroup4.webp" width={200} height={100} alt="awards" loading="lazy" className="awards-img heatforce-img" />
          </div>
        </div>
      </div>
        {trustpilot &&<Trustpilot initialData={null}/>}
    </>
  );
};

export default GroupSlider;
