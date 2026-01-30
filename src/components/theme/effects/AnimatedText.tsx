import React, { useEffect, useRef, useState, CSSProperties } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, className = '', style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={textRef}
      className={`animated-text ${className} ${isVisible ? 'visible' : 'hidden'}`}
      style={style}
    >
      {children}
    </span>
  );
};

export default AnimatedText;
