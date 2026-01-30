import React, { useEffect, useRef } from "react";

const GlobalCursor = (props:any) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const sectionDiv = document.getElementById(props.id);

    if (!cursor || !sectionDiv) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        if (!sectionDiv.contains(e.target as Node)) {
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
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [props.blob, props.id]); // Re-run effect if blob or id changes

  return <div ref={cursorRef} className={props.blob}></div>;
};

export default GlobalCursor;