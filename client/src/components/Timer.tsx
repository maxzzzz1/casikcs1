import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/Timer.css";

const Timer = () => {
  const [timerValue, setTimerValue] = useState(0);

  useEffect(() => {
    const socket = io(`ws://${window.location.hostname}:3001`);
    let timer: NodeJS.Timeout;

    socket.on("timer", (value) => {
      clearInterval(timer);
      setTimerValue(value);
      timer = setInterval(() => {
        setTimerValue((seconds) => seconds + 0.01);
      }, 10);
    });

    return () => {
      clearInterval(timer);
      socket.disconnect();
    };
  }, []);

  return <div className="timer-counter">Crash: {timerValue.toFixed(2)}x</div>;
};

export default Timer;
 