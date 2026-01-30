import React from 'react'
import styles from '../../styles/Pages/SixthSection.module.scss';
import AnimatedHeading from '../theme/effects/AnimatedHeading';
import { useRouter } from 'next/router';

const staticData = [
    {
        title: 'Option 1'
        , info: 'Spread the entire cost of your solar install by 60 or 120 monthly payments on finance'
        , butttonText: 'Pay over 60 or 120 months'
    },
    {
        title: 'Option 2'
        , info: 'Pay outright - All major credit cards and debit cards accepted. Pay By card or bank transfer'
        , butttonText: 'Pay outright'
    }
]
const SixthSection = ({ scrollToPostCode }) => {
    const router = useRouter();
    const finishQuoteFunction = () => {
        if (typeof window !== 'undefined' && window.localStorage.getItem("saveQuotes") && typeof window.localStorage.getItem("saveQuotes") === 'string') {
          router.push(`${window.localStorage.getItem("saveQuotes")}`)
        }
    
      }
    return (
        // <div style={{ background: "#e6f0f9",width:"100%"}} >

        <div className={`container-xl ${styles.mainContainer} mx-auto `} >
            <AnimatedHeading className={`${styles.titleDiv}`} >
                <p>Flexible ways to pay</p>
            </AnimatedHeading>
            <div className={`${styles.gridDiv}`} >
                {staticData.map((data, id) => {
                    return <div key={id} className={`${styles.gridItem}`} >
                        <p className={`${styles.SixthSectiontitleDiv}`}>{data.title}</p>
                        <p className={`${styles.SixthSectioninfoDiv}`}>{data.info}</p>
                        <div className='animationBorder borderRadius10px z-0 mt-auto'>
                            <div className='m1px position-rel z-1 w-100'>
                                <div className={`${styles.buttonDiv}`} style={{ cursor: `${'Option 1' === data.title ? "pointer" : ''}` }} onClick={() => {
                                    if ('Option 1' === data.title) {

                                        scrollToPostCode()
                                        if (typeof window !== 'undefined' && window.localStorage.getItem("saveQuotes") && typeof window.localStorage.getItem("saveQuotes") === 'string') {
                                            finishQuoteFunction()
                                         }
                                         else{
                                            router.push('/survey')
                                         }
                                    }
                                }}>
                                    {data.butttonText}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
        // </div>
    )
}

export default SixthSection