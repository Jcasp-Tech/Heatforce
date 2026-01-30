import React from 'react'
import styles from "../../styles/Pages/FirstSectionFormCard.module.scss";
import Image from 'next/image';
// import AnimatedText from '../theme/effects/AnimatedText';
const FirstSectionFormCard = ({ register,
    formState, handleChange, setPostCode, postCode, isSaveQuoteAvailable, handleSubmit, onSubmit, finishQuoteFunction, restartQuoteFunction }) => {
    // console.log("postCode", formState?.errors)
    return (
        <div className={styles.mainfirstSectionContainer + " firstPostCode"}  >
            <div className={styles.firstHeading} >
                <div className={styles.firstHeading1} >
                    Get an <b>unbeatable</b> online solar price in less than <b> <u> 60 seconds </u></b>
                </div>
            </div><div className={styles.secondHeadingInfo} >
                <div className={styles.secondHeadingInfo1}>
                    Plus use our free calculator to see how much you could save and earn each year. Prices start from only £3,650
                </div>
                <div className={styles.secondHeadingInfo2}>
                    <div className={styles.FinanceAvailablefirstDiv}>Finance Available</div>
                </div>

            </div>
            {isSaveQuoteAvailable && <div className={styles.buttonDivs}>
                <div className="buttonDiv w-auto p-0">
                    <div className="getstartede-button d-flex justify-content-center removeBefore bg-transparent rounded-pill w-100 mw-100 mh-100 z-0">
                        <div className='d-flex justify-content-center my05 w-100'>
                            <button className={`${styles.restartQuoreFirstSectionButton} getstarted-button w-100`} onClick={() => { restartQuoteFunction() }}  >Restart Quote</button>
                        </div>
                    </div>
                </div>

                <div className="buttonDiv w-auto p-0">
                    <div className="getstartede-button d-flex justify-content-center removeBefore bg-transparent rounded-pill w-100 mw-100 mh-100 z-0">
                        <div className='d-flex justify-content-center my05 w-100'>
                            <button className={`${styles.finishQuoteFirstSectionButton} getstarted-button w-100`} onClick={() => { finishQuoteFunction() }}  >Finish Quote</button>
                        </div>
                    </div>
                </div>



            </div>}
            {!isSaveQuoteAvailable &&
                <form onSubmit={handleSubmit(onSubmit)} className={styles.firstSectionformDiv}>
                    {formState?.errors?.postCode && <span className={styles.formErrorsSpan}  >{formState.errors.postCode.message}</span>}
                    <div className={styles.locationIcon}>
                        <Image
                            src="/images/location.webp"
                            className="img"
                            alt="location"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className={styles.firstSectionInputDiv}>
                        <input
                            {...{
                                register,
                                formState,
                                id: 'postCode',
                            }}
                            className={` `}
                            type="text"
                            placeholder="Enter Postcode"
                            value={postCode}
                            onChange={(e) => { handleChange(e.target.value.toUpperCase()), setPostCode(e.target.value.toUpperCase()) }}
                        />
                    </div>

                    <div className="buttonDiv w-auto p-0">
                        <div className="getstartede-button d-flex justify-content-center removeBefore bg-transparent rounded-pill w-100 mw-100 mh-100 my-auto z-0">
                            <div className='d-flex justify-content-center my05 w-100'>
                                <button type="submit" style={{ position: "relative" }} className={` fbqTrackFindLocationClick getstarted-button-ipbox w-100 py-2 px-3 cssanimation fadeInBottom ${styles.getStatedFirstSectionButton}  `}
                                >
                                    {/* <div className="getstartedbtn-shadow"></div> */}
                                    <span className="getStartedButton animated-text visible w-100 text-nowrap" >{!false ? 'Get Started' : 'Continue'}</span>

                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <button className={styles.getStatedFirstSectionButton}>Get Started</button> */}

                </form>
            }
        </div>
    )
}

export default FirstSectionFormCard