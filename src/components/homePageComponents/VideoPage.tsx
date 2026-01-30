import Image from 'next/image';
import styles from '../../styles/Pages/VideoPage.module.scss';
import { useRouter } from 'next/router';

const VideoPage = () => {
  const router = useRouter();

  return (
    <div className={`${styles.videoDiv} container-xl `}>
      <div style={{ display: 'flex', justifyContent: 'center',position:'relative' }}>
        <div className='videoCenterDiv' >
          <div className="titleDiv">
            <p >Wales’ first choice for solar</p>
          </div>
          <div className="listDiv">
            <div className="list">
              <Image quality={100} src={'/images/green_tick.webp'} height={25} width={25} alt='green_tick.webp'/>
            <p >1300+ 5-star Trustpilot Reviews</p>
            </div>
            <div className="list">
            <Image quality={100} src={'/images/green_tick.webp'} height={25} width={25} alt='green_tick.webp'/>
            <p >Voted best solar PV contractor in Wales</p>
            </div>
            <div className="list">
            <Image quality={100} src={'/images/green_tick.webp'} height={25} width={25} alt='green_tick.webp'/>

            <p>5000+ Solar Installs</p>
            </div>
            <div className="list">
            <Image quality={100} src={'/images/green_tick.webp'} height={25} width={25} alt='green_tick.webp'/>

            <p>Welsh & Proud</p>
            </div>

          </div>
            <div className="buttonDiv">
              <div className="getstartede-button z-0" >
                {/* <Link href="/survey/">
                </Link> */}
                  <div className="mainButton fw-bold text-black cursor-pointer" onClick={() => {router.push(`/survey`);}}><p>Get Started</p></div>
              </div>
            </div>
        </div>
        <video
          className="video-image-1 position-rel z-n1"
          autoPlay
          muted
          loop
          playsInline
          width={"100%"}
          height={"80%"}
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
          {/* <Image quality={100} 
            alt="mask"
            src="/images/mcs.webp"
            className='desktop-view'
            width={100}
            height={100}
            style={{ position: 'absolute', left: '10%', bottom: '40px',  }}
            loading="lazy"
            />
          <Image quality={100} 
            alt="mask"
            src="/images/octopus.png"
            className='desktop-view octopus'
            width={200}
            height={80}
            style={{ position: 'absolute', left: '18%', bottom: '47px',  }}
            loading="lazy"
          />
        <Image quality={100} 
          alt="mask"
          src="/images/video-button.webp"
          className='desktop-view'
          width={200}
          height={100}
          style={{ position: 'absolute', right: '10%', bottom: '25px' }}
          loading="lazy"
          /> */}
      </div>
    </div>
  )
};

export default VideoPage;
