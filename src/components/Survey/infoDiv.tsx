import React from 'react'
import styles from "../../styles/modulesStyles/survey.module.scss";
import Image from 'next/image';


export interface InfoDivProps {
  content: string
  className?:any
}

const InfoDiv = (props: InfoDivProps) => {
  const { content,className } = props;


  return (
    <div className={`${styles.infoDiv}`}
    >
      <div>
      
          <Image height={80} width={80}   src="/images/infoIco.webp" alt="back" className={`${styles.backIcon}`} />
      
      </div>
      <div>
        <div className={`${styles.infoText} ${className}`}>{content}</div>
        {/* <div className={`${styles.backButtonTextDark}`} onClick={onBack}> Go Back</div> */}
      </div>
    </div>
  )
}

export default InfoDiv