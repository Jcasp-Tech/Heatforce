import React, { useEffect } from "react";

const GlobalCursor2 = (props: any) => {
  useEffect(() => {
    const cursor: any = document.querySelector(`.globalBlob2`);
    const firstBannerDiv = document.querySelector(`.section2`);
 

    if (!cursor || !firstBannerDiv) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        if (!firstBannerDiv.contains(e.target as Node)) {
          cursor.style.transform = 'translate(0%, 0%)';
        } else {
          let translateX, translateY;

          if (window.matchMedia('(max-width: 768px)').matches) {
            translateX = '125%';
            translateY = '130%';
          } else if (window.matchMedia('(max-width: 1024px)').matches) {
            translateX = '150%';
            translateY = '130%';
          } else {
            translateX = '850px';
            translateY = '100%';
          }

          cursor.style.transform = `translate3d(calc(${e.clientX}px - ${translateX}), calc(${e.clientY}px - ${translateY}), 0px)`;
        }
      });
    };

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(0%, 0%)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId); // Cleanup the frame
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <div className={props.blob}></div>;
};

export default GlobalCursor2;