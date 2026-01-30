import React, { useEffect, useRef, useState } from 'react';

const AnimatedHeading = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: any) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <h2
      ref={headingRef}
      className={`animated-heading ${className} ${isVisible ? 'visible' : 'hidden'}`}
    >
      {children}
    </h2>
  );
};

export default AnimatedHeading;
