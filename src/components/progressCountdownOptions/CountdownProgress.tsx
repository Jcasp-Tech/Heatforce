import React, { useEffect, useState } from 'react';

export interface QuestionCountdownProps {
  totalTime: number;
  minutes: number;
  seconds: number;
  setMinuts: (d: any) => void;
  setSeconds: (d: any) => void;
  handleChange: (d: any, nextC: any) => void;
}
const CountdownWithProgressOptions = (props: any) => {
  const { totalTime, minutes, seconds, setSeconds, setMinuts, handleChange } =
    props;

  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeRemaining) {
      let timerId: string | number | NodeJS.Timeout | undefined;
      const updateCountdown = () => {
        setTimeRemaining((prevTime: number) => {
          const newTimeRemaining = prevTime - 1;
          setProgress((newTimeRemaining / totalTime) * 100);
          if (seconds === 0 && minutes > 0) {
            setMinuts(minutes - 1);
          }
          setSeconds(newTimeRemaining % 60);
          return newTimeRemaining;
        });
      };
      if (timeRemaining > 0) {
        timerId = setTimeout(updateCountdown, 1000);
      }

      if (timeRemaining === 1) {
        handleChange(timerId);
      }
    }
    return () => {};
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(totalTime);
    // setProgress(100);
  }, [totalTime]);

  return (
    <div className="my-coundown w-100">
      <div className="outer-bg">
        <div
          className="inner-bg"
          style={{
            width: `${Math.max(0, progress)}%`,
            background: '#0F3B59',
          }}
        />
      </div>
      <div className="time-count">{`0${minutes}: ${
        seconds < 10 ? `0${seconds}` : seconds
      } sec`}</div>
    </div>
  );
};

export default CountdownWithProgressOptions;
