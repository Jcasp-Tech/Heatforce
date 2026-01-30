// import FooterSection from '@/components/homePageComponents/FooterSection'
// import Navbar from '@/components/homePageComponents/Navbar'
// import { getParseFloat } from '@/components/NumberFunctions';
// import ResultComponent from '@/components/ResultsComponent'
// import ResultLoader from '@/components/theme/loader';
// import { RootState } from '@/redux/reducers';
import { getWebLeadResultsDataAPI, isImageUrlValid } from '@/redux/services/general.api';
// import { PanelState } from '@/redux/slices/panel';
import { wrapper } from '@/redux/store';
// import { GOOGLE_API_KEY, libraries } from '@/utils/constants';
import { nextRedirect, } from '@/utils/helpers';
import useList from '@/utils/useList';
// import { Input } from 'antd'
// import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/router';
import { GOOGLE_API_KEY, libraries } from '@/utils/constants';
import { useLoadScript } from '@react-google-maps/api';
import SummaryDisplayMap from '@/components/gooleMap/summaryDisplayMap';
// import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Trustpilot from '@/components/homePageComponents/trustpilot';
import AnimatedText from '@/components/theme/effects/AnimatedText';
import FinalFormDiv from './FinalFormDiv';
// import { useSelector } from 'react-redux';

export interface ResultsProps {
  codeId: any;
}
export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const Save = (props: ResultsProps) => {

  const { codeId } = props;

  const [quoteData, setQuoteData] = useState<any>();

  const [listData, setListData] = useState<any>();
  const [, setComponentData] = useState<any>();


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY as string,
    libraries: libraries as any,
  });


  const [drawRoofs, setDrawRoofs] = useState();
  const [lastForm, setLastForm] = useState(true);

  const [thankyouPage, setThankyouPage] = useState(false)
  const [initialWidth, setInitialWidth] = useState(0);

  // const router=useRouter()
  const { apiParam } = useList({
    queryParams: {
      randomString: '',
    },
  });

  const [,
    setShowMapPointerToShowMapAfterSavingImage
  ] = useState(false);

  const getResults = async (_id: string) => {
    try {
      // setApiQuoteLoading(true);
      // const tmpArr: any = [];
      const res = await getWebLeadResultsDataAPI(apiParam);
      const allRoofDatas = res?.roofData;

      console.log("both res", res)
      const ComboData = res.leadData.combo;

      let dynamicArray: any = []
      const staticData = [{
        "title": "Scaffolding and access equipment",
        "subtitle": "We will erect this the day before the installation",
        "imgSrc": "/images/awardsSection/scafolding.webp"
      },
      {
        "title": "Fully MCS compliant installation",
        "subtitle": "All your paperwork completed by CES",
        "imgSrc": "/images/awardsSection/CES-Accreds-06.svg"
      },
      {
        "title": "EPVS compliant estimates",
        "subtitle": "Fully audited performance and return on investment estimates",
        "imgSrc": "/images/awardsSection/CES-Accreds-01.svg"
      },
      {
        "title": "EPVS compliant estimates",
        "subtitle": "Fully audited performance and return on investment estimates",
        "imgSrc": "/images/awardsSection/CES-Accreds-04.svg"
      },
      {
        "title": "Trust Mark: Government endorsed quality scheme",
        "subtitle": "For all work carried out in and around your home",
        "imgSrc": "/images/awardsSection/CES-Accreds-11.svg"
      }]
      if (ComboData?.solar_panels?.solar_panel_name) {

        let solarpanelObject = {
          title: `${res.leadData.total_panels}x ${ComboData?.solar_panels?.solar_panel_name} @ ${ComboData?.solar_panels?.solar_panel_kWh}W`,
          "subtitle": "We will erect this the day before the installation",
          "imgSrc": res?.leadData?.combo?.solar_panels?.solar_panel_image?.path
        }
        dynamicArray.push(solarpanelObject)
      }
      if (res?.leadData?.battery_kWh) {
        const getBatteryImage: any = Object.values(ComboData?.battery?.more).find((data: any) => data.battery_kWh === res?.leadData?.battery_kWh)
        let batteryObject = {
          title: `${res?.leadData?.battery_name} @ ${res?.leadData?.battery_kWh} kWh`,
          "subtitle": "We will evoke this the day before the installation",
          "imgSrc": getBatteryImage?.battery_image?.path
        }
        dynamicArray.push(batteryObject)
      }
      if (ComboData?.inverters?.inverter_name) {
        let inverterObject = {
          title: `${ComboData?.inverters?.inverter_name}`,
          "subtitle": "We will evoke this the day before the installation",
          "imgSrc": res?.leadData?.combo?.inverters?.inverter_image?.path
        }
        dynamicArray.push(inverterObject)
      }
      if (ComboData?.optimisers?.optimiser_name) {
        let optimiserObject = {
          title: `${ComboData?.optimisers?.optimiser_name}`,
          "subtitle": "We will evoke this the day before the installation",
          "imgSrc": res?.leadData?.combo?.optimisers?.optimiser_image?.path
        }
        dynamicArray.push(optimiserObject)
      }


      setComponentData(dynamicArray)
      setListData([...dynamicArray, ...staticData])


      // res.roofData.map((roof: any) => {
      //   const tmRoof = JSON.parse(roof.draw_points);
      //   tmpArr.push(JSON.parse(tmRoof));
      //   return roof;
      // });
      // setDrawRoofs(tmpArr);

      const roofDatas = allRoofDatas.map((roof: any, index: number) => {
        const draw_points = roof.draw_points
          ? JSON.parse(JSON.parse(roof.draw_points))
          : null;
        return {
          id: roof.id,
          index: (index + 1) as 1 | 2 | 3,
          draw_points: draw_points,
          roofShading: roof.roofShading,
          roof_pitch: roof.roof_pitch,
          roof_direction: roof.roof_direction,
          suggested_roof_area: roof.suggested_roof_area
            ? parseFloat(roof.suggested_roof_area)
            : null,
          suggested_panel: roof.suggested_panel,
        };
      });
      console.log("roofDatas", roofDatas)
      setDrawRoofs(roofDatas);

      setQuoteData((prevState: any) => {

        return {
          ...prevState,
          selectedBattery: Object.values(res.leadData?.combo?.battery_more).find((data: any) => {
            if (res.leadData?.battery_kWh === '1') {
              return data.battery_sort === 99999

            }
            return data.battery_sort === parseFloat(res?.leadData?.battery_kWh)
          })
          ,
          ...res.leadData,
          leadData: res.leadData,
          allRoofData: allRoofDatas,
          roofData: roofDatas,
          ownership: res.leadData.ownership,
          property: res.leadData.property,
          floors: res.leadData.floors,
          bedrooms: res.leadData.bedrooms,
          occupants: res.leadData.occupants,
          energy_routine: res.leadData.energy_routine,
          energy_usage: res.leadData.energy_usage,
          roof_space: res.leadData.roof_space,
          location: res.leadData.location,
          totalestimatedPrice: 0,
        };
      });

      // setApiQuoteLoading(false);
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    if (codeId && codeId !== 'undefined') {
      apiParam.randomString = codeId;
      getResults(codeId);
    }
  }, [codeId]);

  useEffect(() => {
    if (listData?.length > 0) {
      if (typeof window !== "undefined") {
        const gsap = require("gsap/dist/gsap").gsap;
        const ScrollTrigger = require("gsap/dist/ScrollTrigger").ScrollTrigger;

        // Register the ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        // Register the ScrollTrigger plugin
        gsap.context(() => {
          const timeline = gsap.timeline();
          timeline.fromTo('.headingInfoButtonsDiv', {
            y: 100,
            opacity: 0,
            delay: 1
          }, {
            opacity: 1,
            stagger: .4,
            y: 0,
          }).fromTo('.listItemdiv', {
            opacity: 0,
            delay: 1,
            x: 100,

          },
            {
              opacity: 1,
              stagger: .4,
              // duration: 1 ,
              x: 0,
            })
        })
        const anim2 = gsap.fromTo(
          `.currencyText`,
          {
            opacity: 0,

          }, // Initial state
          { opacity: 1, stagger: .4, duration: 1 } // Final state

        )

        ScrollTrigger.create({
          trigger: `.priceGreenDiv`,
          animation: anim2,
          start: "top bottom",
          // end: "top 100px",
          //  markers: true
        })
      }
    }
  }, [listData])


  useEffect(() => {
    const container = document.getElementById('finalPageMainContainer');
    if (container === null) return
    const formContainer = document.getElementById('finalFormFormDiv')
    if (formContainer === null) return
    if (!container?.children[0]) return
    setTimeout(() => {
      container.style.height = container?.children[0]?.clientHeight + 'px'
    }, 1000)
    // container.style.height=container?.children[0]?.clientHeight+40+'px'
  }, [])
  useEffect(() => {
    const storeWidth = () => {
      setInitialWidth(window.innerWidth)
    }
    document.addEventListener('DOMContentLoaded', storeWidth)
    return () => {
      document.removeEventListener('DOMContentLoaded', storeWidth)
    }
  }, [])
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth === initialWidth) {
        setInitialWidth(window.innerWidth)
        const container = document.getElementById('finalPageMainContainer');
        if (container === null) return
        // container.style.opacity='0';
        console.log("lastForm,thankyouPage", lastForm, thankyouPage)
        if (lastForm && container?.children[0]) {
          container.style.height = container?.children[0]?.clientHeight + 'px'

          container.scrollTo({
            left: container?.children[0]?.clientWidth,
            behavior: 'smooth'
          });
          // container.style.opacity='1';

        }
        if (thankyouPage && container?.children[1] && container?.children[0]) {
          const firstDiv: any = container.children[0];
          const secondDiv: any = container.children[1];

          if (firstDiv === undefined) return;
          if (secondDiv === undefined) return;
          console.log("firstDiv,secondDiv", firstDiv.clientWidth, secondDiv.clientWidth)
          setTimeout(() => {

            container.scrollTo({
              left: secondDiv.clientWidth + firstDiv.clientWidth,
              behavior: 'smooth'
            });

            // container.style.opacity='1';

          }, 500)
          setTimeout(() => {
            container.style.height = secondDiv?.clientHeight + 'px'
            console.log("seconde div", secondDiv);
          }, 1000)
        }
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [thankyouPage, lastForm])


  useEffect(() => {
    if (lastForm) {

      gsap.context(() => {
        // const timeline=gsap.timeline()

      })
    }
  }, [lastForm])
  const [isValidImage, setIsValidImage] = useState(false);
  const [isValidImageSet, setIsValidImageSet] = useState(false);

  useEffect(() => {
    if (quoteData?.leadData) {
      if (quoteData?.leadData?.lead_image?.path) {
        const checkImage = async () => {
          const isValid = await isImageUrlValid(quoteData?.leadData?.lead_image?.path);
          setIsValidImage(isValid);
          setIsValidImageSet(true);
        };
        checkImage();
      } else {
        setIsValidImageSet(true);
      }
    }
  }, [quoteData])

  return (
    <div className="container-xl finalForm">
      {/* <Navbar /> */}
      <Toaster />
      <div className='formDiv' >
        <div className="formSubDiv">
          {false && <div className="heading">
            <p className="fw-bold mx-auto text-center">What&apos;s currently included in your package at {quoteData?.leadData?.postalCode} </p>
            <div className="headingInfoDiv" style={{ overflow: 'hidden' }}>
              <div className="headingInfoButtonsDiv">Fitted in as little as 4-6 weeks</div>
              <div className="headingInfoButtonsDiv">MCS certified installation</div>
              <div className="headingInfoButtonsDiv">DNO application included</div>
            </div>
          </div>}
          <div id='finalPageMainContainer' className="finalPageMainContainer">

            {/* <div className="finalFormInfoDiv">
            <div className="seletedComponentsListingDiv">
              <div className="listingDiv">
                <div className="subListingDiv">
                  { listData?.map((data, index) => (
                    <div key={`${index+data.title}`} className="listItemdiv">
                    <div className={`listImagediv ${index===(listData.length-1)?'noborder':''} `} >
                      <div className="mainImageDiv">
                        <Image quality={100} src={data.imgSrc} alt={data.title} width={100} height={100} style={{objectFit:'contain',width:'100%',height:'100%'}}  />
                      </div>
                    </div>
                    <div className="listDetailsdiv">
                      <p className='listHeading'>{data.title}</p>
                      <p className='listSubHeading'>{data.subtitle}</p>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              <div className="priceGreenDiv">
                <div className="priceStaticDiv">
                  <div className="textDiv">
                    <p className='packageText'>Package price</p>
                    <p className='vatText'>including VAT at 0%</p>
                  </div>
                </div>
                <div className="priceDynamicDiv">
                    <div className="estimateCostDiv">
                      <p className='currencyText'> £ {quoteData?.leadData?.total_Price}</p>
                      <p className='estimateCostText'>estimate cost</p>
                    </div>
                  <div className="perMonthDiv">
                      <p className='currencyText'>£ {quoteData?.leadData?.monthly_apr_from}</p>
                      <p className='perMonthText'>per month</p>
                  </div>
                </div>
              </div>

            </div>
            <div className="nextFormComponentNavigatingDiv">
                <p className='nextFormComponentNavigatingHeading' >What happens next?</p>
                <p className='nextFormComponentNavigatingText'
                 >{`We'll create a personalised 3D solar design for your home based on your answers and package, and then our solar experts will provide you with a final, fixed price quote.`}</p>
                <p className='nextFormComponentNavigatingText'>{`(No in-person visit to your home is required.)`}</p>
                <button className='nextFormComponentNavigatingButton' onClick={scrollToEnd} >Next</button>
              </div>
          </div> */}
            <div className="finalPageFormDiv">
              <div id="finalFormFormDiv" className="finalFormFormDiv">
                <div className="checkoutBadgeDiv">
                  <Image quality={100} src={"/images/checkout_badge.webp"} alt='checkout badge' width={100} height={100} />
                </div>
                <div className="finalFormFormSubDiv-1">
                  <div className='miniMap'>
                    {isLoaded && isValidImageSet && isValidImage && (
                      <Image
                        quality={100}
                        src={quoteData?.leadData?.lead_image?.path}
                        alt="checkout badge"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: '22px',
                        }}
                      />
                    )}
                    {isValidImageSet && (!isValidImage) && isLoaded && quoteData?.leadData && drawRoofs &&
                      (<SummaryDisplayMap
                        {...{
                          allRoofs: drawRoofs,
                          quoteData: quoteData,
                          isLoaded: isLoaded,
                          roof: 'dmpatel',
                        }}
                        setShowMapPointerToShowMapAfterSavingImage={
                          setShowMapPointerToShowMapAfterSavingImage
                        }
                      />)
                    }
                    {quoteData?.leadData && <div className="addressDiv"><span>{quoteData?.leadData?.location}</span></div>}
                  </div>
                  {quoteData?.leadData?.combo && <div key={`${quoteData?.leadData?.combo?.comboImage?.name}`} className="ComboDetailsDiv">
                    <div className="comboImagediv">
                      <Image quality={100} src={quoteData?.selectedBattery?.combo_image?.path} alt={quoteData?.leadData?.combo?.comboImage?.name} width={100} height={100} style={{ objectFit: 'contain', width: '100%', height: '100%', maxHeight: '45px' }} />
                    </div>
                    <div className="comboDetailsdiv">
                      <div className="comboInfoGridDiv">

                        <span>{`${quoteData?.leadData?.combo?.combo_name}`}</span>

                      </div>
                      <div className="panelKwhDiv">
                        {quoteData?.leadData?.web_lead_type === 2 ?
                          <span>{`${quoteData?.leadData?.battery_kWh} KWH ${quoteData?.leadData?.battery_name}`}</span>
                          :
                          <span>{`${quoteData?.leadData?.total_panels}X PANELS (${(parseFloat(quoteData?.leadData?.combo?.solar_panels?.solar_panel_kWh) / 1000 * quoteData?.leadData?.total_panels).toFixed(1)} KWH) `}</span>
                        }
                      </div>

                    </div>
                  </div>}

                  <div className="  jiffyImageDiv   ">
                    <Image quality={100} src={'/images/Jiffy.webp'} width={300} height={400} alt='Jiffy' />
                  </div>
                </div>
                <FinalFormDiv quoteData={quoteData} setQuoteData={setQuoteData} codeId={codeId} setLastForm={setLastForm} thankyouPage={thankyouPage} setThankyouPage={setThankyouPage} />

              </div>
              <div className="trustpilot-div">
                <div className="inner-div">
                  <AnimatedText>
                    <span
                      className="desktop-view page-save-our-customers h-100"
                      style={{ fontFamily: "Roboto", fontSize: "15px", fontWeight: 600 }}
                    >
                      <div className='d-flex align-items-center'>
                        Our Customers say{"    "}
                      </div>
                    </span>
                  </AnimatedText>
                  <Trustpilot initialData={null} />
                </div>
              </div>
            </div>
            <div className="finalPageThankyouDiv">
              <div id="thankyouContainer" className="thankyouContainer">
                <div className='mt-4 mb-4 buttonContainer'  >
                  <Link
                    type="button"
                    className="saveButton"
                    style={{ marginRight: '35px' }}
                    href='/'
                  >
                    Return to home page
                  </Link>

                  <Link
                    type="button"
                    className="saveButton mt-3"
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

                    A member of our team will be in touch shortly to arrange a personalised consultation and discuss the next steps. During this consultation, we&apos;ll create a detailed 3D model of your home, providing an accurate estimate of costs, financing options, and potential energy generation.</p>

                  <p className='contentText'>
                    You will be called by <strong>01792 722642</strong>
                  </p>

                  <p className='contentText'>
                    This consultation is free and does not obligate you to make a purchase.
                  </p>

                  <p className='contentText'>
                    In the meantime, feel free to explore our website or FAQ section for more information about our company and solar energy solutions. You can also connect with us on social media.
                  </p>

                  <p className='contentText'>
                    We look forward to speaking with you soon.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

Save.getInitialProps = wrapper.getInitialPageProps(
  () => async (ctx: any) => {
    const codeId = ctx?.query?.code;
    if (!codeId || codeId === 'undefined') {
      nextRedirect({ ctx, location: '/' });
    }
    return {
      codeId,
    };
  }
);

export default Save