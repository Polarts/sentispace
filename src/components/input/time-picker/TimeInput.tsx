import { KeyboardEvent, useState, useEffect } from 'react';
import NumberField from './NumberField';
import classes from './TimePicker.module.scss';
import { getHours, getMinutes, set } from 'date-fns';

interface TimeInputProps {
  date: Date;
  onDateChange: (date: Date) => void;
  is24HourMode: boolean;
}

const enum timePeriod {
  AM = 'AM',
  PM = 'PM',
  TWENTY_FOUR_HOUR = '24H',
}

const enum Units {
  HOURS = 'hours',
  MINUTES = 'minutes',
}

const units = {
  hours: {
    AM_PM: { min: 1, max: 12, getUnit: getHours },
    TWENTY_FOUR_HOUR: { min: 0, max: 23, getUnit: getHours },
  },
  minutes: { min: 0, max: 59, getUnit: getMinutes },
} as const;

const TimeInput = ({ date, onDateChange, is24HourMode }: TimeInputProps) => {
  const [period, setPeriod] = useState<timePeriod>(
    is24HourMode ? timePeriod.TWENTY_FOUR_HOUR : timePeriod.AM
  );

  useEffect(() => {
    if (is24HourMode) {
      setPeriod(timePeriod.TWENTY_FOUR_HOUR);
    } else {
      setPeriod(timePeriod.AM);
    }
  }, [is24HourMode]);

  const hours24h = getHours(date);
  const hours12h = hours24h % 12 || 12;
  const displayedHours = period === timePeriod.TWENTY_FOUR_HOUR ? hours24h : hours12h;
  const minutes = getMinutes(date);

  const handleTimeInput = (event: KeyboardEvent, unit: Units): void => {
    const { key } = event;
    if (key !== 'Tab') event.preventDefault(); // Prevent default behavior for non-Tab keys

    const previous = unit === Units.HOURS ? displayedHours : minutes;
    const { min, max } =
      unit === Units.HOURS && period === timePeriod.TWENTY_FOUR_HOUR
        ? units.hours.TWENTY_FOUR_HOUR
        : unit === Units.HOURS
        ? units.hours.AM_PM
        : units.minutes;

    // Handle backspace functionality
    if (key === 'Backspace') {
      const truncated = Math.floor(previous / 10); // Remove the last digit
      const updatedUnitValue = truncated;
      const updatedDate = set(date, { [unit]: updatedUnitValue });
      onDateChange(updatedDate);
      return;
    }

    // Handle numeric input (digits 0-9)
    const input = parseInt(key);
    if (isNaN(input) || input < 0 || input > 9) return; // Ignore invalid inputs

    const concatenated = parseInt(String(previous) + String(input));
    let current = input;

    if (concatenated >= min && concatenated <= max) {
      current = concatenated;
    } else if (current < min || current > max) {
      current = previous; // Retain previous value if out of range
    }

    let updatedUnitValue = current;

    // Adjust hour value for 12-hour mode
    if (unit === Units.HOURS) {
      if (period === timePeriod.AM && updatedUnitValue === 12) updatedUnitValue = 0;
      if (period === timePeriod.PM && updatedUnitValue !== 12) updatedUnitValue += 12;
    }

    const updatedDate = set(date, { [unit]: updatedUnitValue });
    onDateChange(updatedDate);
  };

  const handleAMPMToggle = () => {
    if (is24HourMode) return; // Prevent toggle when in 24-hour mode

    let adjustedHour = hours24h;

    switch (period) {
      case timePeriod.AM:
        adjustedHour += 12;
        setPeriod(timePeriod.PM);
        break;
      case timePeriod.PM:
        setPeriod(timePeriod.TWENTY_FOUR_HOUR);
        break;
      case timePeriod.TWENTY_FOUR_HOUR:
        adjustedHour = adjustedHour >= 12 ? adjustedHour - 12 : adjustedHour;
        setPeriod(timePeriod.AM);
        break;
      default:
        setPeriod(timePeriod.AM);
        break;
    }

    const updatedDate = set(date, { hours: adjustedHour });
    onDateChange(updatedDate);
  };

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.inputContainer}>
        <NumberField
          value={displayedHours}
          onKeyDown={(event) => handleTimeInput(event, Units.HOURS)}
        />
        <div className={classes.divider}>:</div>
        <NumberField
          value={minutes}
          onKeyDown={(event) => handleTimeInput(event, Units.MINUTES)}
        />
      </div>
      {!is24HourMode && (
        <div
          className={classes.timePeriodToggle}
          tabIndex={0}
          onClick={handleAMPMToggle}
        >
          {period}
        </div>
      )}
    </div>
  );
};

export default TimeInput;
