// hooks/useCountUp.ts
import { useState, useEffect } from 'react';

interface UseCountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  trigger?: boolean;
}

export const useCountUp = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  trigger = true,
}: UseCountUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeOutQuart;
      
      setCount(Math.floor(currentCount * Math.pow(10, decimals)) / Math.pow(10, decimals));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, start, duration, decimals, trigger]);

  return count;
};