import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import FifthSection from './FifthSection';
import FirstSection from './FirstSection';
import FourthSection from './FourthSection';
import GroupSlider from './GroupSlider';
const  SecondSection =dynamic(() => import('./SecondSection'), { ssr: false });
import VideoPage from './VideoPage';
import SixthSection from './SixthSection';
import Accreditations from './Accreditations';
import { useRouter } from 'next/router';
import SaleBannerSection from './saleBannerSection';

const HomePage = (props: any) => {
 
  const router = useRouter()

  const scrollToPostCode = (parent:any) => {
    console.log('Scroll',parent)
    if(parent=='samediv'){
      const postCodeEl = document.querySelector('#postCode2') as HTMLInputElement
      if (postCodeEl) {
        postCodeEl.focus()
        return
      }
    }
    const anchor = document.querySelector('.firstPostCode')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
      const postCodeEl = document.querySelector('#postCode') as HTMLInputElement
      if (postCodeEl) {
        postCodeEl.focus()
      }
    }else{
      router.push(`/survey`)
    }
  }

  useEffect(() => {
    if (props.popupContent.component) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [props.popupContent.component]);

  return (
    <>
      <div className="">
        <FirstSection
          defaultLoading={props.defaultLoading}
        />

        <SaleBannerSection />

        <SecondSection
          // {...{
          //   scrollToPostCode
          // }}
        />

        <VideoPage />

        <FourthSection handleLearnMoreClick={props.handleLearnMoreClick} />

        <SixthSection {...{scrollToPostCode}}/>
        <FifthSection />
        <GroupSlider trustpilot={false} />
        <Accreditations />
      </div>
    </>
  );
};

export default HomePage;
