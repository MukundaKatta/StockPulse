import { useState, useEffect, useCallback } from 'react';

interface CountdownResult {
  seconds: number;
  isRunning: boolean;
  start: (duration: number) => void;
  reset: () => void;
}

export function useCountdown(): CountdownResult {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds <= 0 && isRunning) setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const start = useCallback((duration: number) => {
    setSeconds(duration);
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  return { seconds, isRunning, start, reset };
}
