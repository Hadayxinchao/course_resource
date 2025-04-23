import { useState, useEffect } from 'react';
import '../styles/Timer.css';

function Timer({ startTime, isRunning }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        const currentTime = new Date();
        const elapsed = (currentTime - startTime) / 1000; // in seconds
        setElapsedTime(elapsed);
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [startTime, isRunning]);
  
  // Format time as MM:SS.ms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
  
  return (
    <div className="timer">
      Time: {formatTime(elapsedTime)}
    </div>
  );
}

export default Timer;