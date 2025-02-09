import React, { useEffect, useRef, useState } from "react";
import Alert, { SeverityType, useAlerts } from "./Alert";
import classes from "./AlertsContainer.module.scss";
import alertStackClasses from "./AlertStack.module.scss";

const AlertsContainer = () => {
  const { alerts, removeAlert } = useAlerts();
  const alertsContainerRef = useRef<HTMLDivElement | null>(null);
  const [alertBottomOffset, setAlertBottomOffset] = useState<number | null>(null);

  useEffect(() => {
    if (alerts.length > 0) {
      setAlertBottomOffset(20);
    }
  }, [alerts]);

  if (alerts.length === 0) return null;

  return (
    <>
      <div
        className="overlay"
        onClick={() => alerts.forEach((alert: { id: any }) => removeAlert(alert.id))}
      />
      <div
        ref={alertsContainerRef}
        className={`${classes.alertsContainer} ${alertBottomOffset !== null ? alertStackClasses.alertBottomOffset : ""}`}
        tabIndex={-1}
      >
        {alerts.map((alert: { id: React.Key | null | undefined; severity: any; title: string | undefined; description: string | undefined; }, index: number) => (
          <Alert
            key={alert.id}
            severity={alert.severity as SeverityType} 
            title={alert.title}
            description={alert.description}
            className={alertStackClasses.alert}
            data-index={index} 
            onDismiss={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </>
  );
};

export default AlertsContainer;
