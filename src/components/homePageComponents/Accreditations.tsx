import React from 'react'
import styles from '../../styles/Pages/Accreditations.module.scss';
import Image from 'next/image';
import AnimatedHeading from '../theme/effects/AnimatedHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const  imageSources = [
   
  "/images/awardsSection/gasSafe_black.webp",
    '/images/awardsSection/CES-Accreds-03.svg',
    "/images/awardsSection/CES-Accreds-04.svg",
    "/images/awardsSection/CES-Accreds-06.svg",
    "/images/awardsSection/CES-Accreds-08.svg",
    "/images/awardsSection/CES-Accreds-10.svg",

    "/images/awardsSection/CES-Accreds-05.svg",
    "/images/awardsSection/CES-Accreds-12.svg",
    "/images/awardsSection/CES-Accreds-07.svg",
    "/images/awardsSection/CES-Accreds-11.svg",
  ];

const Accreditations = () => {  
    useGSAP(() => {
        gsap.context(() => {
            gsap.from(".acc_gridItem", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ".gridDiv",
                  start: "top 70%",
               
                }
              })
        })
    })
  return (
    // <div style={{ background: "#e6f0f9",width:"100%"}} >
    <div className={`container-xl ${styles.mainContainer}`}>
        <AnimatedHeading className={`${styles.titleDiv}`} >
            <p>Our Accreditations</p>
        </AnimatedHeading>

        <div className={`${styles.gridDiv} gridDiv`} >
            {imageSources.map((data,id)=>{
                return <div key={id} className={`${styles.gridItem} `} >
                    <Image quality={100} 
                    height={150}
                    width={120}
                      src={data}
                      alt=""
                      style={{ objectFit: "contain",mixBlendMode:"multiply",maxHeight:'123px' }}
                      className="img-fluid acc_gridItem w-100"
                      fetchPriority="low"
                      loading="lazy"
                    />
                </div>
            })}
        </div>
       

    </div>
    // </div>
  )
}

export default Accreditations