import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FacebookIcon } from '../theme/icons/facebookIcon';
import { InstagramIcon } from '../theme/icons/instagramIcon';
import { LinkedinIcon } from '../theme/icons/linkedinIcon';
import { TwitterIcon } from '../theme/icons/twitterIcon';
import { YoutubeIcon } from '../theme/icons/youtubeIcon';
import AnimatedText from '../theme/effects/AnimatedText';
import Image from 'next/image';

const FooterSection = () => {
  const footerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const handleScroll = () => {
      saveScrollPosition();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const restoreScrollPosition = () => {
      const scrollPosition = localStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
      document.body.classList.remove('hidden');
    };

    document.body.classList.add('hidden');

    window.addEventListener('load', restoreScrollPosition);

    return () => {
      window.removeEventListener('load', restoreScrollPosition);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });

    footerRefs.current.forEach((ref) => {
      if (ref && observer) {
        observer.observe(ref);
      }
    });

    return () => {
      footerRefs.current.forEach((ref) => {
        if (ref && observer) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="ftr-pink container" />
      <div className="footer-wrapper">
        <footer className="aes-footer aes-ftr-para footer-div container">
          <div className="container aes-ftr-pdng" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div className="row footerM footer-top-section">
              <div

                className="col-12 col-sm-6 col-md-6 col-lg-3 footer-block px-4"
                data-aos="zoom-in"
                data-aos-duration="1000"
                ref={(el: any) => (footerRefs.current[0] = el)}
              >
                <b>
                  <AnimatedText>
                    <h5 className="border-bottom border-dark footer-section-hading">
                      Support
                    </h5>
                  </AnimatedText>
                </b>
                <ul className="p-0">
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      Mon/Tuesday: 09:15 - 17:40
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      Wednesday: 09:50 - 19:00
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">Thursday: 09:15 - 18:30</li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">Friday: 09:15 - 16:00</li>
                  </AnimatedText>
                </ul>
              </div>
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-3 footer-block px-4"
                data-aos="zoom-in"
                data-aos-duration="1000"
                ref={(el: any) => (footerRefs.current[1] = el)}
              >
                <AnimatedText>
                  <h5 className="border-bottom border-dark footer-section-hading">
                    Further information
                  </h5>
                </AnimatedText>
                <ul className="p-0">
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      <Link
                        href="/complaints-procedure"
                        title="Complaints procedure"
                        className="nav-link"
                      >
                        Complaints procedure
                      </Link>
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      <Link
                        href="/cancellation-policy"
                        title="Cancellation policy"
                        className="nav-link"
                      >
                        Cancellation policy
                      </Link>
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      <Link
                        href="https://heatforce.co.uk/privacy-policy/"
                        title="Privacy Policy"
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      <Link
                        href="https://heatforce.co.uk/cookie-policy/"
                        title="Cookie policy"
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cookie policy
                      </Link>
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      <Link
                        href="https://heatforce.co.uk/terms-and-conditions/"
                        title="Terms and Conditions"
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions
                      </Link>
                    </li>
                  </AnimatedText>
                  <br />
                  <AnimatedText>
                    <li className="list-group-item fw-bold">
                      <Link
                        href="https://heatforce.co.uk/finance-options/"
                        title="Deposits, Goods and Advance Payments"
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Deposits, Goods and Advance Payments
                      </Link>
                    </li>
                  </AnimatedText>
                </ul>
              </div>
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-3 footer-block ftr-blk-pdg px-4"
                data-aos="zoom-in"
                data-aos-duration="1000"
                ref={(el: any) => (footerRefs.current[2] = el)}
              >
                <AnimatedText>
                  <h5 className="border-bottom border-dark footer-section-hading">
                    Get in Touch
                  </h5>
                </AnimatedText>


                <ul className="p-0">
                  <li className="list-group-item ">
                    <AnimatedText>
                      <Link
                        href="tel:+02920763622"
                        title="tel:+02920763622"
                        className="nav-link"
                      >
                        029 2076 3622
                      </Link>
                    </AnimatedText>
                  </li>
                  <li className="list-group-item ">
                    <AnimatedText>
                      <Link
                        href="mailto:solarpv@heatforce.co.uk"
                        title="mailto:solarpv@heatforce.co.uk"
                        className="nav-link"
                      >
                        solarpv@heatforce.co.uk
                      </Link>
                    </AnimatedText>
                  </li>
                  <li className="list-group-item py-2 fw-bold" style={{ paddingTop: '0px !important' }} >
                    <AnimatedText>
                      <p className="addrs-ftr text-dark mb-1" style={{ marginBottom: '0px', fontWeight: 'bold' }}>
                        Our Locations
                      </p>
                      <p className="addrs-ftr text-dark" style={{ marginBottom: '0px' }}>
                        Unit 10, Lambourne Crescent<br />
                        Cardiff Business Park<br />
                        Llanishen<br />
                        Cardiff CF14 5GP
                      </p>
                    </AnimatedText>
                  </li>
                </ul>
              </div>
              <div
                className=" flex col-12 col-sm-6 col-md-6 col-lg-3 gap-1 footer-block ftr-logo-address footer-logo justify-content-center justify-content-lg-start px-4"
                data-aos="zoom-in"
                data-aos-duration="1000"
                ref={(el: any) => (footerRefs.current[3] = el)}
              >
                <div className="ftr-logo" style={{ paddingBottom: '10px' }} >
                  <Link href="/" title="Advance Energy Star" className="nav-link">
                    <Image quality={100}
                      src="/images/Heatforce-Logo.png"
                      alt="Advance Energy Star"
                      className="img-fluid"
                      width={999}
                      height={999}
                      loading="lazy"
                    />
                  </Link>
                </div>
                <ul className="footer-media-group media-icons">
                  <AnimatedText>
                    <li style={{ backgroundColor: 'black' }} className="list-group-item list-social-icon p-1 footer-media-link">
                      <Link
                        href="https://www.facebook.com/HeatforceWales/"
                        title="facebook"
                        target="_blank"
                        className="nav-link"

                      >
                        <FacebookIcon />
                      </Link>
                    </li>
                  </AnimatedText>
                  <AnimatedText>
                    <li style={{ borderColor: 'transparent', padding: 'none' }} className="list-group-item list-social-icon p-1 footer-media-link">
                      <Link
                        href="https://www.instagram.com/heatforce.uk/"
                        title="Instagram"
                        target="_blank"
                        className="nav-link"
                      >
                        <InstagramIcon />
                      </Link>
                    </li>
                  </AnimatedText>
                  <AnimatedText>
                    <li className="list-group-item list-social-icon p-1 footer-media-link">
                      <Link
                        href="https://x.com/heatforceuk"
                        title="Twitter"
                        target="_blank"
                        className="nav-link"
                      >
                        <TwitterIcon />
                      </Link>
                    </li>
                  </AnimatedText>
                  <AnimatedText>
                    <li className="list-group-item list-social-icon p-1 footer-media-link">
                      <Link
                        href="https://www.youtube.com/@HeatforceWales"
                        target="_blank"
                        title="Youtube"
                        className="nav-link"
                      >
                        <YoutubeIcon />
                      </Link>
                    </li>
                  </AnimatedText>
                  <AnimatedText>
                    <li style={{ backgroundColor: 'black', borderRadius: "8px" }} className="list-group-item list-social-icon p-1 footer-media-link">
                      <Link
                        href="https://uk.linkedin.com/company/heatforce-ltd"
                        title="Linkedin"
                        target="_blank"
                        className="nav-link"
                      >
                        <LinkedinIcon />
                      </Link>
                    </li>
                  </AnimatedText>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="footer-disclaimer"
            data-aos="zoom-in"
            data-aos-duration="1000"
            ref={(el: any) => (footerRefs.current[4] = el)}
          >
            {/* <AnimatedText>
            <p className="text-dark">
              &copy; 2024 Consumer Energy Solutions Limited. All rights reserved.
            </p>
          </AnimatedText> */}
            {/* <AnimatedText>
            <p className="text-dark">
              Registered address: The Third Floor, Langdon House Langdon Road,
              Swansea Waterfront, Swansea, West Glamorgan, Wales, SA1 8QY.
            </p>
          </AnimatedText> */}
            <AnimatedText>
              <p className="text-dark">
                All content © Copyright Heatforce Wales Ltd 2026.
              </p>
              <p className="text-dark">
                Registered in England &amp; Wales No. 4261333. Registered address: Unit 10 Lambourne Crescent, Cardiff Business Park, Llanishen, Cardiff, CF14 5GP
              </p>
              <p className="text-dark">
                Gas Safe Registration No. 171871   |   VAT Reg No. 700883645
              </p>
              <p className="text-dark">
                Heatforce (Wales) Ltd trading as Heatforce is authorised and regulated by the Financial Conduct Authority (FRN 737889). We are a credit broker not a lender. We operate an exclusive arrangement with our selected lenders to offer finance options. Please refer to our credit broking disclosure statement for further details of our credit broking services. Credit is subject to terms and conditions and an assessment of affordability carried out by the Lender.
              </p>
            </AnimatedText>
            {/* <AnimatedText>
            <p className="text-dark">
              Site Developed and Managed by{' '}
              <Link
                href="https://jcasptechnologies.com/"
                target="_blank"
                className="fw-bold color-blck"
              >
                JCaspTechnologies
              </Link>
            </p>
          </AnimatedText> */}
          </div>
          <Image quality={100}
            src="/images/ces-footer-logo.png"
            alt="Advance Energy Star"
            className="img-fluid next-image-test"
            loading="lazy"
            width={100}
            height={100}
          />
        </footer>
      </div>
      {/* <p className='mx-auto container py-4'  >© 2024 Consumer Energy Solutions Limited. All rights reserved.
        </p> */}
    </>
  );
};

export default FooterSection;
