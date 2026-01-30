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
                  gap: '1rem',
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
              >

                <SplideSlide>
                  <div
                    className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center"
                    style={{ height: '100%', minHeight: '100px' }}
                  >
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/boilerheating_winner-300x211.png"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/EPVS-Logo-300x119.webp"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/gas-safe-mini-tiles-1-qrc2jlnwmi6i2wqpemy0aijsv07wd0biysqornzaw8.webp"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/greenDeal_1.webp"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/greenDeal.webp"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/hies-accredited-member-r4fnpi4b1snhm8qmq5biqefau44wmv82gjqakqewa0.webp"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/mcs-mini-tiles-1-qrc2jmlqtc7seipc95cmv0b9ge39kpf9axe68xxwq0.webp"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="award-1 col-12 my-2 px-4 d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100px' }}>
                    <Image quality={100}
                      height={100}
                      width={250}
                      src="/images/awardsSection/Rectangle-300x104.png"
                      alt=""
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                </SplideSlide>

              </Splide>
            </div>
          </div>
          {/* <!-- ====Awards End==== --> */}
        </div>
      </AnimatedText>
      {/* CES Accreditations Section - Commented out for now
      <AnimatedText>
        <div className="container-fluid container-fluids pb-5">
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
                className="my-splider"
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
        </div>
      </AnimatedText>
      */}
    </section>
  );
};

export default AwardSection;
