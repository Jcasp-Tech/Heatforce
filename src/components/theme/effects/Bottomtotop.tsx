import { useEffect, useState, useRef } from 'react';

const Bottomtotop = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top;
        const elementBottom = ref.current.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight && elementBottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`bottomtotop transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      {children}
    </div>
  );
};

export default Bottomtotop;