import { useState, useEffect } from 'react';

export const use24HourModeState = () => {
  // Define state with a boolean type
  const [is24HourMode, setIs24HourMode] = useState<boolean>(() => {
    try {
      const savedMode = localStorage.getItem('is24HourMode');
      return savedMode ? JSON.parse(savedMode) : false;
    } catch (e) {
      console.error("Error parsing 'is24HourMode' from localStorage", e);
      return false;
    }
  });

  // Effect to update localStorage whenever `is24HourMode` changes
  useEffect(() => {
    localStorage.setItem('is24HourMode', JSON.stringify(is24HourMode));
  }, [is24HourMode]);

  // Toggle function to switch between true and false for `is24HourMode`
  const toggle24HourMode = () => {
    setIs24HourMode((prevMode: boolean) => !prevMode);
  };

  return { is24HourMode, toggle24HourMode };
};
