import React, { useEffect, ChangeEvent, MouseEvent, TouchEvent } from 'react';
import FullscreenModal from '@modals/FullscreenModal';
import { X } from '@phosphor-icons/react';
import Button from '../../../components/input/button/Button';
import DatePicker from '../../../components/input/date-picker/DatePicker';
import IconPicker from '../../../components/input/icon-picker/IconPicker';
import RatingPicker from '../../../components/input/rating-picker/RatingPicker';
import TextField, { TextFieldElement } from '../../../components/input/text-field/TextField';
import TimePicker from '../../../components/input/time-picker/TimePicker';
import { db } from '../../../data/Database';
import CategorySelect from '../../categories/category-selection/CategorySelect';
import { Activity } from '../Activity.interface';
import classes from './ActivityEditForm.module.scss';
import { DELETE_GUARD_ALERT, VALIDATION_ALERTS } from './state/activityForm.constants';
import useActivityForm from './state/useActivityForm';
import { useAlerts } from '@/data/contexts/alertsPromptContext';

interface ActivityEditFormProps {
  onClose: () => void;
  activity?: Partial<Activity>;
  onCloseTemplateSelection?: () => void;
}

const CLOSE_ICON_PROPS = {
  size: 24,
};

const ActivityEditForm = ({
  onClose,
  activity,
  onCloseTemplateSelection,
}: ActivityEditFormProps) => {
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
    setAlert,
    clearAlert,
    resetState,
    enableDeleteGuard,
    disableDeleteGuard,
  } = useActivityForm(activity);

  const { title, description, rating, startTime, endTime, isNow, iconKey, categoryIds, alert } = state;

  const { showAlert, alerts, removeAlert } = useAlerts();

  useEffect(() => {
    if (alert && alert.type !== 'deleteGuard' && validations[alert.type]) {
      clearAlert();
    }
  }, [alert, clearAlert, validations]);

  useEffect(() => {
    if (alert && alert.type === 'deleteGuard') {
      clearAlert();
      enableDeleteGuard();
    }
  }, [alert, clearAlert, enableDeleteGuard]);

  const handleTitleChange = (event: ChangeEvent<TextFieldElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<TextFieldElement>) => {
    setDescription(event.target.value);
  };

  const isFormValid = (): boolean => {
    for (const validation of VALIDATION_ALERTS) {
      const { type, title, description } = validation;
      if (type !== 'deleteGuard' && !validations[type]) {
        setAlert(validation);
        showAlert({
          title,
          severity: 'error',
          content: description,
        });
        return false;
      }
    }
    return true;
  };

  const handlePrimaryButton = async (event: MouseEvent | TouchEvent): Promise<void> => {
    event.preventDefault();

    if (!isFormValid()) return;

    try {
      if (activity?.id) {
        await db.activities.update(activity.id, {
          title,
          description,
          rating,
          startTime,
          endTime,
          iconKey,
          categoryIds,
        });
        showAlert({
          title: 'Activity Updated!',
          severity: 'success',
          content: 'Your activity has been updated successfully.',
        });
      } else {
        await db.activities.add({
          title,
          description,
          rating,
          startTime,
          endTime,
          iconKey,
          categoryIds,
        } as Activity);
        showAlert({
          title: 'Activity Created!',
          severity: 'success',
          content: 'Your activity has been created successfully.',
        });
      }
      onCloseTemplateSelection ? onCloseTemplateSelection() : onClose();
    } catch (error) {
      console.error('Error creating/updating activity:', error);
      showAlert({
        title: 'Error!',
        severity: 'error',
        content: 'An error occurred while saving your activity. Please try again.',
      });
    }
  };

  const handleSecondaryButton = async (event: MouseEvent | TouchEvent): Promise<void> => {
    event.preventDefault();

    if (activity?.id) {
      if (deleteGuard) {
        setAlert(DELETE_GUARD_ALERT);
        showAlert({
          title: DELETE_GUARD_ALERT.title,
          severity: DELETE_GUARD_ALERT.severity,
          content: DELETE_GUARD_ALERT.description,
        });
        disableDeleteGuard();
        return;
      }

      await db.activities.delete(activity.id);
      showAlert({
        title: 'Activity Deleted!',
        severity: 'success',
        content: 'The activity has been deleted successfully.',
      });
      onClose();
    } else {
      resetState();
      showAlert({
        title: 'Form Reset!',
        severity: 'info',
        content: 'The form has been reset.',
      });
    }
  };

  const handleClose = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();
    onClose();
  };

  return (
    <FullscreenModal>
      <form className={classes.form}>
        <FullscreenModal.Header>
          <FullscreenModal.Title>
            {activity?.id ? 'Edit Activity' : 'Create a new activity'}
          </FullscreenModal.Title>
          <X {...CLOSE_ICON_PROPS} onClick={handleClose} />
        </FullscreenModal.Header>
        <div className={classes.inputs}>
          <div className={classes.titleAndIcon}>
            <IconPicker
              className={classes.iconPicker}
              label="Select an Icon"
              iconKey={iconKey}
              onIconChange={setIcon}
            />
            <TextField
              label="Title"
              iconKey={iconKey || 'PencilLine'}
              name="title"
              max={50}
              placeholder="What's the name of your activity?"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <TextField
            multiline
            label="Description"
            iconKey="FilmSlate"
            name="description"
            max={250}
            placeholder="Give a brief description of your activity."
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className={classes.categorySelectWrapper}>
            <CategorySelect
              label="Categories (optional)"
              placeholder="Select a category for your activity."
              categoryIds={categoryIds}
              onCategoriesChange={setCategories}
            />
          </div>
          <RatingPicker
            label="How did you feel about this activity?"
            rating={rating}
            onRatingChange={setRating}
          />
          <DatePicker label="Date" date={startTime} onDateChange={setDate} />
          <TimePicker
            label="Time"
            startTime={startTime}
            endTime={endTime}
            isNow={isNow}
            onTimeChange={setTime}
          />
        </div>
        <div className="alerts-container">
          {alerts?.map((alert: { id: any; severity: any; icon: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: number) => (
            <div
              key={alert.id || index}
              className={`alert-card alert-${alert.severity}`}
              style={{ bottom: `${20 + index * 10}px` }}
              onClick={() => removeAlert(alert.id || index)}
            >
              <div className="alert-content-container">
                <div className="alert-icon">{alert.icon}</div>
                <div className="alert-header">
                  <div className="alert-title">{alert.title}</div>
                  <p className="alert-content">{alert.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FullscreenModal.ButtonsPanel>
          <Button
            variant="primary"
            onClick={handlePrimaryButton}
            disabled={!isChanged && !!activity?.id}
          >
            {activity?.id ? 'Save Changes' : 'Create Activity'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleSecondaryButton}
            underline
            isDangerous={!!activity}
            disabled={!activity?.id && !isChanged}
          >
            {activity?.id ? 'Delete Activity' : 'Reset'}
          </Button>
        </FullscreenModal.ButtonsPanel>
      </form>
    </FullscreenModal>
  );
};

export default ActivityEditForm;
