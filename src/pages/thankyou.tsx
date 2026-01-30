// import Navbar from '@/components/homePageComponents/Navbar'

import styles from '../styles/modulesStyles/thankyoupage.module.scss';

import React from 'react'
import Link from 'next/link';

const thankyou = () => {

    return (
        <>
            {/* <Navbar /> */}
            <div>
                <div className={`${styles.ThankyouPage}`}>
                    <div className="thankyouContainer">
                        <div className='mt-4 mb-4 buttonContainer'  >
                            <Link
                                type="button"
                                className="saveButton mt-3 max-W-220"
                                href='/'
                            >
                                Return to home page
                            </Link>

                            <Link
                                type="button"
                                className="saveButton mt-3 max-W-221"
                                href='/about-us'
                            >
                                About CES Solar Shop
                            </Link>
                        </div>

                        <div>
                            <p className='thankyouText'>
                                Thank you for choosing Consumer Energy Solutions
                            </p>

                            <p className='contentText'>
                                A member of our team will be in touch shortly to arrange a personalised consultation
                                and discuss the next steps. During this consultation, we&apos;ll create a detailed 3D model
                                of your home, providing  an accurate estimate of coasts, financing  options, and
                                potential  energy generation.
                            </p>

                            <p className='contentText'>
                                You will be called by {' '}
                                <a href="tel:01792 722642" className='text-black text-decoration-none'>
                                    01792 722642
                                </a>
                            </p>

                            <p className='contentText'>
                                This consultation is free and does not obligate you to make a purchase.
                            </p>

                            <p className='contentText'>
                                In the meantime, feel free to  explore our website or FAQ section for more information
                                about our company and solar energy solutions. You can also connect with us on
                                social media.
                            </p>

                            <p className='contentText'>
                                We look forward to speaking with you soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default thankyou
