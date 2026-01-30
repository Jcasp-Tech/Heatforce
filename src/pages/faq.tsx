// import Navbar from '@/components/homePageComponents/Navbar';
import FooterSection from '@/components/homePageComponents/FooterSection';
import FaqSection from '@/components/ResultsComponent/faqSection';
import Image from 'next/image';
import Trustpilot from '@/components/homePageComponents/trustpilot/trustreview5star';
import Navbar from '@/components/homePageComponents/Navbar';
// import Trustpilot from "../homePageComponents/trustpilot/trustreview5star";

const CookiePolicy = () => {

  return (
    <>
      <Navbar />
      <div className='resultContainer container'>
        <div className="container faqImg mb-12">
          <Image quality={100} 
            height={500}
            width={1000}
            className="img_style"
            src="/faq/faq_hero_image.webp"
            alt="heroimage"
          />
        </div>

        <FaqSection
          isPage={true}
        />
      </div>
        <Trustpilot initialData={null} />
        <FooterSection />
    </>
  );
};

export default CookiePolicy;
