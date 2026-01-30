import { Splide, SplideSlide } from '@splidejs/react-splide';
import AnimatedText from './theme/effects/AnimatedText';
import Image from 'next/image';

const AwardSection = () => {
  return (
    <section
      style={{ backgroundColor: 'white' }}
      className="award text-center "
    >
      <AnimatedText>
        <div
          className="container-fluid container-fluids"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          {/* <!-- ====Awards Start==== --> */}
          <div className="award-box">
            <h2 className="display-5">Our awards and recognition</h2>
            <div className="awards-img row px-4">
              <Splide
                options={{
                  perPage: 4,
                  pagination: false,
                  breakpoints: {
                    768: {
                      perPage: 1,
                    },
                    1080: {
                      perPage: 2,
                    },
                    1400: {
                      perPage: 3,
                    },
                  },
                }}
                aria-label="My Favorite Images"
              // style={{maxHeight: "33px"}}
              >

                <SplideSlide>
                  <div
                    className="award-1 col-12 my-2 px-4"
                    style={{ height: '100%' }}
                  >
                    <Image quality={100}
                      height={65}
                      width={250}
                      src="/images/awardsSection/large-project-year-award.webp"
                      alt=""
                      // style={{ height: '108px' }}
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4">
                    <Image quality={100}
                      height={65}
                      width={250}
                      src="/images/awardsSection/large-scale-project-award.webp"
                      alt=""
                      // style={{ height: '108px' }}
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4">
                    <Image quality={100}
                      height={65}
                      width={250}
                      src="/images/awardsSection/boiler-award.webp"
                      alt=""
                      // style={{ height: '108px' }}
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4">
                    <Image quality={100}
                      height={65}
                      width={250}
                      src="/images/awardsSection/vulnerable-award.webp"
                      alt=""
                      // style={{ height: '108px' }}
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                {/* <SplideSlide>
                  <div className="award-1 col-12 my-2" style={{ height: '100%' }}>
                    <Image quality={100} 
                      height={65}
                      width={250}
                      src="/images/awardsSection/Awards_Winner_fabric_installer.webp"
                      alt=""
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide> */}

                <SplideSlide>
                  <div
                    className="d-flex align-items-center"
                    style={{ width: '50%', margin: 'auto', height: '100%' }}
                  >
                    <div className='d-flex align-items-center'>
                      <Image quality={100}
                        height={65}
                        width={250}
                        src="/images/awardsSection/Awards_Winner_fabric_installer.webp"
                        alt=""
                        style={{ width: '100%' }}
                        className="img-fluidd"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    </div>
                  </div>
                </SplideSlide>

                <SplideSlide>
                  <div className="award-1 col-12 my-2" style={{ height: '100%' }}>
                    <Image quality={100}
                      height={65}
                      width={250}
                      src="/images/awardsSection/Insulation-Installer-Third-Outline.webp"
                      alt=""
                      // style={{ height: '100%' }}
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2" style={{ height: '100%' }}>
                    <Image quality={100}
                      height={65}
                      width={250}
                      src="/images/awardsSection/RH-Installer-Outline.webp"
                      alt=""
                      // style={{ height: '100%' }}
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                {/* <SplideSlide>
                  <div
                    className="award-1 col-12   my-2"
                    style={{ height: '100%' }}
                  >
                    <Image quality={100} 
                      height={65}
                      width={250}
                      src="/images/awardsSection/Winner_renewable_installer.webp"
                      alt=""
                      className="img-fluid"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide> */}

                <SplideSlide>
                  <div
                    className="d-flex align-items-center"
                    style={{ width: '50%', margin: 'auto', height: '100%' }}
                  >
                    <div className='d-flex align-items-center'>
                      <Image quality={100}
                        height={65}
                        width={250}
                        src="/images/awardsSection/Winner_renewable_installer.webp"
                        alt=""
                        style={{ width: '100%' }}
                        className="img-fluidd"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    </div>
                  </div>
                </SplideSlide>

                <SplideSlide>
                  <div
                    className="d-flex align-items-center"
                    style={{ width: '50%', margin: 'auto', height: '100%' }}
                  >
                    <div className='d-flex align-items-center'>
                      <Image quality={100}
                        height={65}
                        width={250}
                        src="/images/awardsSection/energy-efficiency-awards-2024-solar-pv-installer.webp"
                        alt=""
                        style={{ width: '100%' }}
                        className="img-fluidd"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    </div>
                  </div>
                </SplideSlide>

                <SplideSlide>
                  <div
                    className="d-flex align-items-center"
                    style={{ width: '50%', margin: 'auto', height: '100%' }}
                  >
                    <div className='d-flex align-items-center'>
                      <Image quality={100}
                        height={65}
                        width={250}
                        src="/images/awardsSection/energy-efficiency-awards-2024-insulation-fabric-installer.webp"
                        alt=""
                        style={{ width: '100%' }}
                        className="img-fluidd"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    </div>
                  </div>
                </SplideSlide>

              </Splide>
            </div>
          </div>
          {/* <!-- ====Awards End==== --> */}
        </div>
      </AnimatedText>
      <AnimatedText>
        <div className="container-fluid container-fluids pb-5">
          {/* <!-- ====Accreditations Start==== --> */}
          <div
            className="award-box pt-3"
            data-aos="fade-out"
            data-aos-duration="1000"
          >
            <h2 className="display-5">CES Accreditations</h2>
            <div className="awards-img row px-4">
              <Splide
                options={{
                  perPage: 8,
                  pagination: false,
                  breakpoints: {
                    640: {
                      perPage: 1,
                    },
                    768: {
                      perPage: 3,
                    },
                    1024: {
                      perPage: 5,
                    },
                  },
                }}
                aria-label="My Favorite Images"
                className="my-splider" // Add a class name for styling
              >
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/elmhurst-energy-approved.webp"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-01.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/gas-safe.webp"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-03.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/hetas.webp"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-04.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-06.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-08.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-07.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-05.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-09.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-10.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-11.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>
                <SplideSlide>
                  <Image quality={100}
                    height={150}
                    width={120}
                    src="/images/awardsSection/CES-Accreds-12.svg"
                    alt=""
                    className="img-fluid w-100"
                    fetchPriority="low"
                    loading="lazy"
                  />
                </SplideSlide>

              </Splide>
            </div>
          </div>
          {/* <!-- ====Accreditations End==== --> */}
        </div>
      </AnimatedText>
    </section>
  );
};

export default AwardSection;
