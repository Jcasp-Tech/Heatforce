import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const TrustPilotBox = dynamic(() => import('./trustPilotBox'), { ssr: false });

interface Review {
  stars: number;
  createdAt: string;
  title: string;
  text: string;
  reviewUrl: string;
  verification: {
    createdAt: string;
    isVerified: boolean;
    reviewSource: string;
    verificationSource: string;
    verificationLevel: string;
  };
  consumer: {
    displayName: string;
  };
  companyReply: {
    createdAt: string;
    text: string;
  };
}

type DataType =
  | Review[]
  | Record<string, Review>
  | { reviews: Review[] | Record<string, Review> };

export async function getServerSideProps() {
  try {
    const cacheKey = 'trustpilot_reviews_cache';
    const cacheExpiration = 60 * 60 * 1000 * 24;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
        return {
          props: {
            initialData: JSON.parse(cachedData),
          },
        };
      }
    }
    const res = await axios.get(
      `https://widget.trustpilot.com/trustbox-data/53aa8912dec7e10d38f59f36?businessUnitId=61d9967de1cf858473046da5&locale=en-GB&reviewLanguages=en&reviewStars=5&includeReviews=true&reviewsPerPage=15`
    );

    localStorage.setItem(cacheKey, JSON.stringify(res.data));
    localStorage.setItem(
      `${cacheKey}_timestamp`,
      new Date().getTime().toString()
    );

    return {
      props: {
        initialData: res.data,
      },
    };
  } catch (error) {
    return { props: { initialData: null } };
  }
}

const spliderIteratable = (data: DataType) => {
  const reviewsArray = Array.isArray(data) ? data : Object.values(data);

  const formatDate = (dateString: string): string => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffTime = now.getTime() - reviewDate.getTime();
    const diffHours = diffTime / (1000 * 3600);
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffHours < 24) {
      return `${Math.floor(diffHours)} hours ago`;
    }
    if (diffDays < 7) {
      return `${Math.floor(diffDays)} days ago`;
    }
    return reviewDate.toLocaleDateString();
  };

  return reviewsArray.map((review, index) => (
    <SplideSlide key={review.id || `review-${index}`}>
      <div
        className="reviewDiv slick-slide slick-active"
        data-slick-index="1"
        aria-hidden="false"
      >
        <div className="reviewSubDiv1">
          <svg
            role="img"
            className="reviewStar star_5"
            aria-labelledby="starRating-t3cifyddzm"
            viewBox="0 0 251 46"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '50%' }}
          >
            {review.stars === 5 ? (
              <svg
                height="50"
                width="250"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 96"
              >
                <g fill="none">
                  <g fill="#00b67a">
                    <path d="M0 0h96v96H0zM104 0h96v96h-96zM208 0h96v96h-96zM312 0h96v96h-96zM416 0h96v96h-96z" />
                  </g>
                  <path
                    d="M48 64.7L62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z"
                    fill="#fff"
                  />
                </g>
              </svg>
            ) : (
              <svg
                width="250"
                height="50"
                viewBox="0 0 512 96"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Trustpilot_ratings_4star-RGB"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g fillRule="nonzero">
                    <rect
                      id="Rectangle-path"
                      fill="#73CF11"
                      x="0"
                      y="0"
                      width="96"
                      height="96"
                    />
                    <rect
                      id="Rectangle-path"
                      fill="#73CF11"
                      x="104"
                      y="0"
                      width="96"
                      height="96"
                    />
                    <rect
                      id="Rectangle-path"
                      fill="#73CF11"
                      x="208"
                      y="0"
                      width="96"
                      height="96"
                    />
                    <rect
                      id="Rectangle-path"
                      fill="#73CF11"
                      x="312"
                      y="0"
                      width="96"
                      height="96"
                    />
                    <rect
                      id="Rectangle-path"
                      fill="#DCDCE6"
                      x="416"
                      y="0"
                      width="96"
                      height="96"
                    />
                    <path
                      d="M48,64.7 L62.6,61 L68.7,79.8 L48,64.7 Z M81.6,40.4 L55.9,40.4 L48,16.2 L40.1,40.4 L14.4,40.4 L35.2,55.4 L27.3,79.6 L48.1,64.6 L60.9,55.4 L81.6,40.4 L81.6,40.4 L81.6,40.4 L81.6,40.4 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M152,64.7 L166.6,61 L172.7,79.8 L152,64.7 Z M185.6,40.4 L159.9,40.4 L152,16.2 L144.1,40.4 L118.4,40.4 L139.2,55.4 L131.3,79.6 L152.1,64.6 L164.9,55.4 L185.6,40.4 L185.6,40.4 L185.6,40.4 L185.6,40.4 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M256,64.7 L270.6,61 L276.7,79.8 L256,64.7 Z M289.6,40.4 L263.9,40.4 L256,16.2 L248.1,40.4 L222.4,40.4 L243.2,55.4 L235.3,79.6 L256.1,64.6 L268.9,55.4 L289.6,40.4 L289.6,40.4 L289.6,40.4 L289.6,40.4 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M360,64.7 L374.6,61 L380.7,79.8 L360,64.7 Z M393.6,40.4 L367.9,40.4 L360,16.2 L352.1,40.4 L326.4,40.4 L347.2,55.4 L339.3,79.6 L360.1,64.6 L372.9,55.4 L393.6,40.4 L393.6,40.4 L393.6,40.4 L393.6,40.4 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M464,64.7 L478.6,61 L484.7,79.8 L464,64.7 Z M497.6,40.4 L471.9,40.4 L464,16.2 L456.1,40.4 L430.4,40.4 L451.2,55.4 L443.3,79.6 L464.1,64.6 L476.9,55.4 L497.6,40.4 L497.6,40.4 L497.6,40.4 L497.6,40.4 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    />
                  </g>
                </g>
              </svg>
            )}
          </svg>
        </div>
        <div className="reviewHeader two-line-text-ellipsis">{review.title}</div>
        <div className="review two-line-text-ellipsis">{review.text}</div>
        <div className="date-and-user-info-wrapper">
          <div className="name">{`${review.consumer.displayName},`}</div>
          <div className="date">{formatDate(review.createdAt)}</div>
        </div>
      </div>
    </SplideSlide>
  ));
};

const Trustpilot = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://widget.trustpilot.com/trustbox-data/53aa8912dec7e10d38f59f36?businessUnitId=61d9967de1cf858473046da5&locale=en-GB&reviewLanguages=en&reviewStars=5&includeReviews=true&reviewsPerPage=15`
      );
      setData(res.data);
    } catch (error) {
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, [initialData]);

  if (isLoading) {
    return <></>
  }

  return (
    <div className="trustpilot-review-div container">
      <div className="justify-content-betweeen align-items-center testimonial-inner splider-class-mine">
        <div className='TrustPilotBox-wrapper-class' >
          {/* <TrustBox /> */}
          <TrustPilotBox rating={data.businessEntity.numberOfReviews.total} />
        </div>
        <div className="trustpilot-parent-div">
          <section style={{ backgroundColor: 'white' }} className="trustSlider ">
            <div
              className="container-fluid container-fluids"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="award-box py-3">
                <div className="awards-img row ">
                  <Splide
                    options={{
                      perPage: 4,
                      breakpoints: {
                        600: { perPage: 1 },
                        768: { perPage: 2 },
                        992: { perPage: 2 },
                        1200: { perPage: 3 },
                        1600: { perPage: 4 },
                        2000: { perPage: 4 },
                        2400: { perPage: 5 },
                      },
                      pagination: true,
                    }}
                    aria-label="Trustpilot Reviews"
                  >
                    {spliderIteratable(data.reviews)}
                  </Splide>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  );
};

export default Trustpilot;
