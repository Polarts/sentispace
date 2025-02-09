import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import FullscreenModal from "@modals/FullscreenModal";
import { X } from "@phosphor-icons/react";
import Alert, { useAlerts } from "../../../components/generic/Alert";
import Button from "../../../components/input/button/Button";
import DatePicker from "../../../components/input/date-picker/DatePicker";
import IconPicker from "../../../components/input/icon-picker/IconPicker";
import RatingPicker from "../../../components/input/rating-picker/RatingPicker";
import TextField from "../../../components/input/text-field/TextField";
import TimePicker from "../../../components/input/time-picker/TimePicker";
import { db } from "../../../data/Database";
import CategorySelect from "../../categories/category-selection/CategorySelect";
import { Activity } from "../Activity.interface";
import classes from "./ActivityEditForm.module.scss";
import { DELETE_GUARD_ALERT, VALIDATION_ALERTS } from "./state/activityForm.constants";
import useActivityForm from "./state/useActivityForm";
import AlertsContainer from "@/components/generic/AlertContainer";

enum SeverityType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}

const CLOSE_ICON_PROPS = { size: 24 };

interface ActivityEditFormProps {
  onClose: () => void;
  activity?: Partial<Activity>;
  onCloseTemplateSelection?: () => void;
}

const ActivityEditForm = ({ onClose, activity, onCloseTemplateSelection }: ActivityEditFormProps) => {
  const { showAlert, alerts, removeAlert } = useAlerts();
  const {
    state,
    validations,
    isChanged,
    deleteGuard,
    setTitle,
    setDescription,
    setRating,
    setDate,
    setTime,
    setIcon,
    setCategories,
    resetState,
    enableDeleteGuard,
    disableDeleteGuard,
  } = useActivityForm(activity);

  const { title, description, rating, startTime, endTime, iconKey, categoryIds } = state;

  const isFormValid = (): boolean => {
    for (const validation of VALIDATION_ALERTS) {
      const { type, severity, title, description } = validation;
      if (type !== "deleteGuard" && !validations[type]) {
        showAlert({ severity: severity as SeverityType, title, description });
        return false;
      }
    }
    return true;
  };

  const handlePrimaryButton = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();
    if (!isFormValid()) return;

    if (activity?.id) {
      db.activities.update(activity.id, { title, description, rating, startTime, endTime, iconKey, categoryIds });
      showAlert({ severity: SeverityType.SUCCESS, title: "Activity Updated", description: "The activity has been updated successfully." });
    } else {
      db.activities.add({ title, description, rating, startTime, endTime, iconKey, categoryIds } as Activity);
      showAlert({ severity: SeverityType.SUCCESS, title: "Activity Created", description: "The activity has been created successfully." });
    }

    onCloseTemplateSelection ? onCloseTemplateSelection() : onClose();
  };

  const handleSecondaryButton = async (event: MouseEvent | TouchEvent): Promise<void> => {
    event.preventDefault();

    if (activity?.id && deleteGuard) {
      showAlert(DELETE_GUARD_ALERT);
      disableDeleteGuard();
      return;
    }

    if (activity?.id) {
      await db.activities.delete(activity.id);
      showAlert({ severity: SeverityType.INFO, title: "Activity Deleted", description: "The activity has been deleted." });
    }

    resetState();
    onClose();
  };

  const handleClose = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();
    onClose();
  };

  const alertsContainerRef = useRef<HTMLDivElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement | null>(null);
  const [alertBottomOffset, setAlertBottomOffset] = useState<number | null>(null);

  useEffect(() => {
    if (alerts.length > 0 && createButtonRef.current) {
      const buttonRect = createButtonRef.current.getBoundingClientRect();
      setAlertBottomOffset(window.innerHeight - buttonRect.top + 20);
    }
  }, [alerts]);

  return (
    <FullscreenModal>
      <AlertsContainer />
      <form className={classes.form}>
        <FullscreenModal.Header>
          <FullscreenModal.Title>
            {activity?.id ? "Edit Activity" : "Create a new activity"}
          </FullscreenModal.Title>
          <X {...CLOSE_ICON_PROPS} onClick={handleClose} />
        </FullscreenModal.Header>
        ...
      </form>
    </FullscreenModal>
  );
};

export default ActivityEditForm;
