import { useState, useEffect, useRef } from 'react';

export const useFlash = (value) => {
  const [flashClass, setFlashClass] = useState('');
  const prevValue = useRef(value);

  useEffect(() => {
    if (value > prevValue.current) {
      setFlashClass('bg-positive/20 text-positive animate-flash-green');
    } else if (value < prevValue.current) {
      setFlashClass('bg-negative/20 text-negative animate-flash-red');
    }

    const timer = setTimeout(() => {
      setFlashClass('');
    }, 500);

    prevValue.current = value;
    return () => clearTimeout(timer);
  }, [value]);

  return flashClass;
};
