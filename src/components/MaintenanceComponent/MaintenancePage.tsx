/* eslint-disable react/no-unescaped-entities */
import AnimatedText from '../theme/effects/AnimatedText';

const MaintenancePage = () => {
  return (
    <div
      className="text-black py-3 overflow-hidden"
      style={{ backgroundColor: '#e6f0f9' }}
    >
      <div className="marquee-content">
        <span className="marquee-text">
          <AnimatedText>
            This site is under maintenance between 9am and 11am today - we will
            be back online soon with amazing new offers! Thanks for your
            understanding.{' '}
          </AnimatedText>
        </span>
      </div>
      <style jsx>{`
        .marquee-content {
          animation: scroll 30s linear infinite;
          white-space: nowrap;
          display: inline-block;
          padding-left: 100%;
        }
        .marquee-text {
          font-weight: medium;
          font-size: 1.125rem;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
