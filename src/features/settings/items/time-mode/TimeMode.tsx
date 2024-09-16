import SettingsItem from '../../settings-item/SettingsItem';
import Switch from '../../../../components/input/switch/Switch';
import { use24HourModeState } from '../../../../utils/hooks/use24HourModeState';

const TimeMode = () => {
  const { is24HourMode, toggle24HourMode } = use24HourModeState(); // Using the custom hook

  return (
    <SettingsItem label="24h Mode" iconKey="Clock">
      <Switch checked={is24HourMode} onChange={toggle24HourMode} />
    </SettingsItem>
  );
};

export default TimeMode;
