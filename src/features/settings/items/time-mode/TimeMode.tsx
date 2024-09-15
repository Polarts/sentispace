import { useState, useEffect } from 'react';
import SettingsItem from '../../settings-item/SettingsItem';
import Switch from '../../../../components/input/switch/Switch';

//Added TimeMode component to item settings, will store 24mode in local storage 
const TimeMode = () => {
  const [is24HourMode, setIs24HourMode] = useState<boolean>(() => {
    try {
      const savedMode = localStorage.getItem('is24HourMode');
      return savedMode ? JSON.parse(savedMode) : false;
    } catch (e) {
      console.error("Error parsing 'is24HourMode' from localStorage", e);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('is24HourMode', JSON.stringify(is24HourMode));
  }, [is24HourMode]);

  const handleToggle = () => {
    setIs24HourMode(prevMode => !prevMode);
  };

  return (
    <SettingsItem label="24h Mode" iconKey="Clock">
      <Switch checked={is24HourMode} onChange={handleToggle} />
    </SettingsItem>
  );
};

export default TimeMode;
