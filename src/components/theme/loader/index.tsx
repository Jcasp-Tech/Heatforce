/* eslint-disable no-promise-executor-return */

import axios from 'axios';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
gsap.registerPlugin(useGSAP);

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

interface LoaderProps {
  loading: boolean;
  apiQuoteLoading: boolean;
}

const ResultLoader = ({ loading, apiQuoteLoading }: LoaderProps) => {
  const [loadingRoof, setLoadingRoof] = useState(true);
  const [loadingEstimate, setLoadingEstimate] = useState(true);
  const [loadingSaving, setLoadingSaving] = useState(true);
  const [review, setReview] = useState(null);

  async function runTimeoutsSequentially() {
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomArbitrary(1000, 1100))
    );
    setLoadingRoof(false);

    await new Promise((resolve) =>
      setTimeout(resolve, getRandomArbitrary(1000, 1100))
    );
    setLoadingEstimate(false);

    if (loading && apiQuoteLoading) {
      await new Promise((resolve) =>
        setTimeout(resolve, getRandomArbitrary(500, 900))
      );
      setLoadingSaving(false);
    }
  }

  async function getTrustPilotReviews() {
    const trustPilotGetReviewsURL =
      'https://widget.trustpilot.com/trustbox-data/53aa8912dec7e10d38f59f36?businessUnitId=61d9967de1cf858473046da5&locale=en-GB&reviewLanguages=en&reviewStars=5&includeReviews=true&reviewsPerPage=1';
    const res = await axios.get(trustPilotGetReviewsURL);
    setReview(res.data.businessEntity.numberOfReviews.total);
  }

  runTimeoutsSequentially();

  useEffect(() => {
    getTrustPilotReviews();
  }, []);
  
useGSAP(()=>{
  let t1=gsap.timeline();
  t1.from('.loader_div',{
    x:-100,
    opacity:0,
    delay:.1,
    stagger:1,
    ease:"back.out(1.7)"
  }).from('.trustpilotText',{
    x:-100,
    opacity:0,
    delay:.3,
    stagger:1,
    ease:"back.out(1.7)"

  })
})
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display:loading?'flex':'none',
        background:'white',
        justifyContent: 'center',
        alignItems: 'center',
        position:'fixed',
        zIndex:"99999",
        top:0,
      
      }}
    >
      <div className="loader" >
        <div className="loader_div">
          {loadingRoof ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
              }}
            >
              <Image height={80} width={80}
                className="loader_img"
                src="/images/flame.svg"
                alt="loader"
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
              }}
            >
              <Image height={80} width={80} className="loader_done_img" src="/images/flame.svg" alt="done" />
            </div>
          )}
          <div style={{ marginRight:'auto' }}>
            <p className="loader_text">Analysing your roof</p>
          </div>
        </div>
        <div className="loader_div">
          {loadingEstimate ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
              }}
            >
              <Image height={80} width={80}
                className="loader_img"
                src="/images/flame.svg"
                alt="loader"
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
              }}
            >
              <Image height={80} width={80} className="loader_done_img" src="/images/flame.svg" alt="done"/>
            </div>
          )}
          <div style={{ marginRight:'auto' }}>
            <p className="loader_text">Calculating Estimate</p>
          </div>
        </div>
        <div className="loader_div">
          {loadingSaving ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
              }}
            >
              <Image height={80} width={80}
                className="loader_img"
                src="/images/flame.svg"
                alt="loader"
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
              }}
            >
              <Image height={80} width={80} className="loader_done_img" src="/images/flame.svg" alt="done" />
            </div>
          )}
          <div style={{ marginRight:'auto' }}>
            <p className="loader_text">Generating savings</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBlock: '20px',
            alignItems: 'center',
          }}
        >
          <p className="loader_text trustpilotText" style={{ fontSize: '15px' }}>
            See our{' '}
            <a
              style={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: '800',
              }}
              href="https://uk.trustpilot.com/review/consumerenergysolutions.co.uk?utm_medium=trustbox&utm_source=Carousel"
              target="_blank"
              rel="noopener"
            >
              {/* <TrustPilotReviews /> */}
              {review}
            </a>{' '}
            reviews on{' '}
            <Image height={80} width={80}
              src="/images/trustpilot.svg"
              alt="trustpilot"
              style={{ marginBottom: '5px' }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default ResultLoader;
