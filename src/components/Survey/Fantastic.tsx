import React, { useEffect, useState } from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import { QUESTION } from '@/utils/constants';
import { roofDetails } from '@/redux/services/types';
import { InfoCircleIcon } from '../theme/icons/infoCircleIcon';
import MiniMap from '../gooleMap/miniGoogle';
import GetYourEstimateButton from './GetYourEstimateButton';
import { getOrdinal } from '@/utils/helpers';


export interface FantasticProps {
  availableRoof: number;
  isLoaded: boolean | undefined;
  // isLoading: boolean;
  // handleSaveQuoteData: (d: any) => void;
  // handleAddEditRoof: (
  //   d: roofDetails | undefined,
  //   status: 'add' | 'edit' | 'delete'
  // ) => void;
  allRoofs: roofDetails[];
  isMobile: boolean;
  setBack?: (d: any) => void;
  back: boolean;
  handleAddEditRoof: any;
  allQuestionsData: any;
  AllRoof: any;
  setWebLeadResponsData: any;

}

const Fantastic = (props: FantasticProps) => {
  const {
    isLoaded,
    // isLoading,
    // handleSaveQuoteData,

    allRoofs,
    // availableRoof,
    isMobile, back,
    handleAddEditRoof,
    allQuestionsData,
    AllRoof,
    // setWebLeadResponsData
  } = props;

  const questionConst = QUESTION
  const [validatePanel, setValidatePanel] = useState(false);
  const questionIndex = 20; //from 18 to 20

  // const onBack = () => {
  //   setBack(true);
  // }
  console.log(props, "renders")
  const getSetroofs = () => {
    let allCount = 0;
    allRoofs.map((d: roofDetails) => {
      if (d.draw_points) {
        allCount++;
      }
      return d;
    });
    return allCount;
  };

  const getPendingroof = () => {
    let i = 0;
    for (let index = 0; index < allRoofs.length; index++) {
      const ar = allRoofs[index];
      if (ar && ar.draw_points === null) {
        i = ar.index - 1;
        break;
      }
    }
    return i;
  };

  useEffect(() => {
    setValidatePanel(false);
    // setTimeout(() => {
    //   const element = document.getElementById('selected-roof-spaces_mobile');
    //   element?.scrollIntoView({ behavior: 'smooth' });
    // }, 20);
    // }
  }, [allRoofs]);

  // useEffect(() => {
  //   if (giveAnswer !== 0) {
  //       handleChange(questionIndex + 1, { occupants: giveAnswer }, questionConst[questionIndex+1].id);
  //     } 
  // }, [giveAnswer]);

  return (
    <div data-aos={
      isMobile
        ? back
          ? "fade-left"
          : "fade-right"
        : ''
    }
      className={`${styles.surveyContainer}`} id={`${questionConst[questionIndex].id}`}>
      <div>
        <div className={`${styles.questionHeader}`}> {questionConst[questionIndex].qhead} </div>
        <p className={`${styles.questionText}`}>{allQuestionsData.solar_system_size ? questionConst[questionIndex].qtxt1 : questionConst[questionIndex].qtxt }</p>
      </div>

      <div>
        <div className="your-property">
          {allRoofs &&
            allRoofs.length > 0 &&
            allRoofs.map((list: roofDetails, idn: number) => (
              <div key={`${idn + 1}`} className="max-fan-width">
                {list.draw_points && (
                  <div
                    key={`${idn + 1}`}
                    className="mt-2 mb-2 d-flex justify-content-between align-items-center ready-for-solar px-5"
                  >
                    <div className="h-10 min-map-width">
                      <MiniMap
                        key={`${list.index}_${Math.floor(Math.random() * 1000) + 1
                          }`}
                        {...{
                          isLoaded,
                          selectedRoof: list.draw_points,
                          index: list.index,
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between mb-2 mb-md-4 roof-area-div">
                        <div className="d-flex flex-column justify-content-between me-5">
                          <p className={styles.grayColorText}>
                            {' '}
                            Roof area{' '}
                          </p>
                          <h4 className="fw-bold">
                            {list.suggested_roof_area?.toString().split('.')[0]}m
                            <sup>2</sup>
                          </h4>
                        </div>
                        <div className="d-flex flex-column justify-content-between ms-2">
                          <p className={styles.grayColorText}>
                            {' '}
                            {allQuestionsData.solar_system_size ? 'System Size' : 'Suitable for'}
                            {' '}
                          </p>
                          <h4 className="fw-bold">
                            {allQuestionsData.solar_system_size ? `${allQuestionsData.solar_system_size}KWh system` : `${list.suggested_panel} panels`}
                            {/* {list.suggested_panel} panels */}
                          </h4>
                        </div>
                      </div>
                      <div className="mt-1 d-flex justify-content-between  align-items-center">
                        <p
                          style={{ padding: 0, margin: 0 }}
                          className="grayColor fw-bold align-items-end cursor-pointer edit-This-RoofText"
                          onClick={() => handleAddEditRoof(list, 'edit')}
                        >
                          Edit this roof {'>'}
                        </p>
                        {getSetroofs() > 1 && (
                          <p
                            style={{ padding: 0, margin: 0 }}
                            onClick={() => handleAddEditRoof(list, 'delete')}
                            className="text-danger fw-bold align-items-end cursor-pointer ms-2 delete-roof-txt"
                          >
                            Delete roof
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          {
            ((getSetroofs() < 3)) && (
              <div className="">
                <div className='animationBorder borderRadius25px my-3 z-0'>
                  <div className='m1px position-rel z-1 w-100'>
                    {allQuestionsData.solar_system_size ?
                      (<></>)
                      : <button
                        type="button"
                        className="add-dash p-2 p-xl-3 w-100  d-flex align-items-center"
                        onClick={() => {
                          if (getSetroofs() === 1) {
                            handleAddEditRoof(allRoofs[getPendingroof()], 'add');
                          } else if (getSetroofs() === 2) {
                            handleAddEditRoof(allRoofs[getPendingroof()], 'add');
                          }
                        }}
                      >
                        <div className="d-flex text-dark align-items-center justify-content-center gap-3 w-100">
                          <div className="text-dark roof-action color-black-background color-white d-flex align-items-center justify-content-center">
                            <svg
                              fill="#000000"
                              width="32px"
                              height="32px"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0" />
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                <path d="m21.484 11.125-9.022-5a1 1 0 0 0-.968-.001l-8.978 4.96a1 1 0 0 0-.003 1.749l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749zm-9.461 4.73-6.964-3.89 6.917-3.822 6.964 3.859-6.917 3.853z" />
                                <path d="M12 22a.994.994 0 0 0 .485-.126l9-5-.971-1.748L12 19.856l-8.515-4.73-.971 1.748 9 5A1 1 0 0 0 12 22zm8-20h-2v2h-2v2h2v2h2V6h2V4h-2z" />
                              </g>
                            </svg>
                          </div>
                          <div>
                            Add your {getSetroofs() === 2 ? <span>3<sup>{`${getOrdinal(3)}`}</sup></span> : <span>2<sup>{`${getOrdinal(2)}`}</sup></span>} roof space
                          </div>
                        </div>
                      </button>
                    }
                  </div>
                </div>
              </div>
            )}
          {validatePanel && (
            <div className="unfortunately-message">
              <InfoCircleIcon /> Unfortunately, we can only provide quotes with a
              minimum of 6 panels
            </div>
          )}
          <span id={`${questionConst[questionIndex].id}`} />
          <GetYourEstimateButton setValidatePanel={setValidatePanel} allQuestionsData={allQuestionsData} allRoofs={allRoofs} AllRoof={AllRoof} />

        </div>

      </div>

      {/* <div>
        <div className={`${styles.backButtonDiv} mobile-view`} onClick={() => handleChange(questionIndex - 1, { property: giveAnswer }, questionConst[questionIndex-1].id)}
        >
          <div>
            <div  >
              <Image quality={100} src="/images/backIcon.svg" width={35} height={35} alt="back" className={`${styles.backIcon}`} />
            </div>
          </div>
          <div>
            <div className={`${styles.backButtonTextLight}`}> Made a mistake ?</div>
            <div className={`${styles.backButtonTextDark}`} onClick={onBack}> Go Back</div>
          </div>
        </div>

      </div> */}
    </div>
  )
}

export default Fantastic