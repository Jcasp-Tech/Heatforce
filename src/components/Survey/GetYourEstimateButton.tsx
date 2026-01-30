import { saveQuoteWebLeadDataAPI, updateErrorLogs } from '@/redux/services/general.api';
import { roofDetails } from '@/redux/services/types';
import { deepClone } from '@/utils/helpers';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "../../styles/modulesStyles/survey.module.scss";
import { event, EVENTENUMS } from '../Pixel/facebook/lib/fpixel';



const GetYourEstimateButton = ({ allQuestionsData, allRoofs, AllRoof, setValidatePanel }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter()
  const handleSaveQuoteData = async () => {
    setIsLoading(true);
    if (allQuestionsData) {
      const tmpAllQuestionData = deepClone(allQuestionsData);
      if (tmpAllQuestionData.energy_usage) {
        delete tmpAllQuestionData.no_energy_usage;
      } else {
        delete tmpAllQuestionData.annual_energy_usage;
      }
      if (localStorage.getItem('pinCenter')) {
        tmpAllQuestionData.pinLocation = JSON.parse(localStorage.getItem('pinCenter') || '{}') || {};
      }
      if (localStorage.getItem('findZoom')) {
        tmpAllQuestionData.findZoom = localStorage.getItem('findZoom')
      }
      delete tmpAllQuestionData.gMap;
      delete tmpAllQuestionData.roofArea;
      delete tmpAllQuestionData.roofShading;
      delete tmpAllQuestionData.roof_direction;
      delete tmpAllQuestionData.roof_pitch;

      try {
        // const res = await saveQuoteWebLeadDataAPI(tmpAllQuestionData);
        // if (res) {
        // setWebLeadResponsData({ randomstring: res.randomstring, id: res.id });

        for (let i = 0; i < allRoofs.length; i++) {
          if (allRoofs[i]?.draw_points) {
            const shade = allRoofs[i]?.roofShading === 1;
            const tempRoofData = {
              draw_points: JSON.stringify(allRoofs[i]?.draw_points),
              roofShading: shade,
              roof_pitch: allRoofs[i]?.roof_pitch,
              roof_direction: allRoofs[i]?.roof_direction,
              suggested_roof_area: allRoofs[i]?.suggested_roof_area,
              suggested_panel: allRoofs[i]?.suggested_panel,
              WebLead_id: {
                id: '',
              },
            };
            AllRoof.push(tempRoofData)
          }
        }
        tmpAllQuestionData.roofData = AllRoof
        tmpAllQuestionData.roof_space = tmpAllQuestionData.web_lead_type === 2 ? 1 : tmpAllQuestionData.roof_space
        tmpAllQuestionData.solar_system_size = !tmpAllQuestionData.solar_system_size ? 0 : tmpAllQuestionData.solar_system_size
        const res = await saveQuoteWebLeadDataAPI(tmpAllQuestionData);
        cacheImage(['/images/flame.svg', '/images/LOADER_GREY.webp'])

        try {
          if (res) {
            // setWebLeadResponsData({ randomstring: res.randomstring, id: res.id });

            // router.push(`/quote/results/${res.randomstring}`);
            localStorage.setItem('saveQuotes', `/quote/results/${res.randomstring}`);
            localStorage.setItem('WebLeadType', res.web_lead_type)
            const url = `/quote/results/${res.randomstring}`
            await updateErrorLogs({
              module_name: "SummaryDisplayMap",
              record_id: res?.id,
              logs: { "line": "74", "function": "GetYourEstimateButton", "msgLog": { id: res.id, WebLeadType: res.web_lead_type, url: url } },
            })

            window.location.href = url;
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  const getTotalPanel = () => {
    event(EVENTENUMS.AddToBasket);
    let panelCount = 0;
    allRoofs.map((d: roofDetails) => {
      if (d.suggested_panel) {
        panelCount += d.suggested_panel;
      }
      return d;
    });
    if (allQuestionsData.solar_system_size) {
      setValidatePanel(false);
      handleSaveQuoteData();
    } else {
      if (panelCount >= 6) {
        setValidatePanel(false);
        handleSaveQuoteData();
        // console.log("here")
      } else {
        setValidatePanel(true);
      }
    }
  };


  const cacheImage = async (array) => {
    const allPromises = array.map(async (url) => {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url
        img.onload = () => resolve(url)
        img.onerror = () => reject(url)
      })
    })
    const res = await Promise.all(allPromises)
    console.log(res, "cached images")
  }
  useEffect(() => {
    cacheImage(['/images/flame.svg', '/images/LOADER_GREY.webp'])
  }, [])
  return (
    <div className=" d-flex align-items-center mt-3">
      <div className='animationBorder borderRadius10px z-0'>
        <div className='m1px position-rel z-1 w-100 fbqTrackAddToBasketClick'>
          <button
            id="get-price-button"
            type="button"
            onClick={getTotalPanel}
            disabled={isLoading}
            className={`  ${styles.getPriceBbutton}`}
          >
            Get your estimate
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetYourEstimateButton