import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { CheckCircle, Info, Question, Warning, XCircle } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import classes from './Alert.module.scss';

const cx = classNames.bind(classes);

export type SeverityType = "success" | "error" | "info" | "warning";

interface AlertProps {
  severity: SeverityType;
  description?: string;
  title?: string;
  marginTop?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onDismiss?: () => void;
}

export type AlertType = {
  id: string;
  severity: SeverityType;
  title: string;
  description: string;
};


const defaultState = {
  alerts: [] as AlertType[],
  showAlert: (_: Omit<AlertType, 'id'>) => {},
  removeAlert: (_: string) => {},
};

export type AlertsContextState = typeof defaultState;

const AlertsContext = createContext<AlertsContextState>(defaultState);

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsPromptProvider');
  }
  return context;
};

const getAlertIcon = (severity: SeverityType) => {
  const iconProps = { size: 50 };
  switch (severity) {
    case 'success':
      return <CheckCircle {...iconProps} />;
    case 'error':
      return <XCircle {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;
    case 'warning':
      return <Warning {...iconProps} />;
    default:
      return <Question {...iconProps} />;
  }
};

const Alert = ({ severity, title, description, marginTop, className, style, onDismiss }: AlertProps) => (
  <div
    className={cx('alert-card', `alert-${severity}`, className, marginTop && 'marginTop')}
    style={style}
    onClick={() => onDismiss?.()}
  >
    <div className={cx('alert-icon')}>{getAlertIcon(severity)}</div>
    <div className={cx('alert-content-container')}>
      {title && <div className={cx('alert-title')}>{title}</div>}
      {description && <div className={cx('alert-content')}>{description}</div>}
    </div>
  </div>
);

export const AlertsPromptProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [fontSize, setFontSize] = useState('1rem');
  const alertTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const adjustFontSize = () => {
    if (alerts.length === 0) {
      setFontSize('1rem');
      return;
    }

    const longestMessageLength = Math.max(
      ...alerts.map(alert => `${alert.title ?? ''} ${alert.description ?? ''}`.length)
    );

    let calculatedFontSize = '1rem';
    if (longestMessageLength > 100) {
      calculatedFontSize = '0.8rem';
    } else if (longestMessageLength > 50) {
      calculatedFontSize = '0.875rem';
    }

    setFontSize(calculatedFontSize);
  };

  useEffect(adjustFontSize, [alerts]); 

  const showAlert = ({ title, severity, description }: Omit<AlertType, 'id'>) => {
    setAlerts(prev => {
      if (prev.some(alert => alert.severity === severity)) {
        return prev;
      }
      const id = `${Date.now()}-${Math.random()}`;
      const newAlert = { id, title, severity, description };

      alertTimeouts.current[id] = setTimeout(() => {
        removeAlert(id);
      }, 10000);

      return [...prev, newAlert];
    });
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    if (alertTimeouts.current[id]) {
      clearTimeout(alertTimeouts.current[id]);
      delete alertTimeouts.current[id];
    }
  };

  useEffect(() => {
    return () => {
      Object.values(alertTimeouts.current).forEach(clearTimeout);
      alertTimeouts.current = {};
    };
  }, []);

  return (
    <AlertsContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
      <div className={cx('alertsContainer')} style={{ '--alert-font-size': fontSize } as React.CSSProperties}>
        {alerts.map((alert, index) => (
          <Alert
            key={alert.id}
            severity={alert.severity}
            title={alert.title}
            description={alert.description}
            marginTop={index > 0}
            className={cx('stacked-alert')}
            style={{
              transform: `translate(-50%, ${index * 15}px) scaleY(${Math.max(0.4, 1 - index * 0.05)})`,
              borderBottomWidth: `${Math.max(1, 5 - index)}px`,
              transition: 'top 0.3s ease, opacity 0.3s ease',
            }}
            onDismiss={() => setTimeout(() => removeAlert(alert.id), 100)}
          />
        ))}
      </div>
    </AlertsContext.Provider>
  );
};

export default Alert;
