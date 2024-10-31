import FullscreenModal from '@modals/FullscreenModal';
import { X } from '@phosphor-icons/react';
import { ChangeEvent, MouseEvent, TouchEvent, useEffect } from 'react';
import Alert from '../../../components/generic/Alert';
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
import {
  DELETE_GUARD_ALERT,
  VALIDATION_ALERTS
} from './state/activityForm.constants';
import useActivityForm from './state/useActivityForm';

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

  const {
    title,
    description,
    rating,
    startTime,
    endTime,
    isNow,
    iconKey,
    categoryIds,
    alert,
  } = state;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    rating,
    startTime,
    endTime,
    isNow,
    iconKey,
    categoryIds,
  ]);

  const isFormValid = (): boolean => {
    for (let i = 0; i < VALIDATION_ALERTS.length; i++) {
      const { type } = VALIDATION_ALERTS[i];
      if (type !== 'deleteGuard' && !validations[type]) {
        setAlert(VALIDATION_ALERTS[i]);
        return false;
      }
    }

    return true;
  };

  const handleTitleChange = (event: ChangeEvent<TextFieldElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const handleDescriptionChange = (event: ChangeEvent<TextFieldElement>) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handlePrimaryButton = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();

    if (!isFormValid()) return;

    if (activity?.id) {
      db.activities.update(activity.id, {
        title,
        description,
        rating,
        startTime,
        endTime,
        iconKey,
        categoryIds,
      });
    } else {
      db.activities.add({
        title,
        description,
        rating,
        startTime,
        endTime: endTime,
        iconKey,
        categoryIds,
      } as Activity);
    }

    onCloseTemplateSelection ? onCloseTemplateSelection() : onClose();
  };

  const handleSecondaryButton = async (
    event: MouseEvent | TouchEvent,
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (activity?.id) {
      if (deleteGuard) {
        setAlert(DELETE_GUARD_ALERT);
        disableDeleteGuard();
        return;
      }

      await db.activities.delete(activity.id);
      onClose();
      return;
    }

    resetState();
  };

  const handleClose = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();
    event.stopPropagation();

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
          {!!alert && (
            <Alert
              isScrollIntoView
              severity={alert.severity}
              title={alert.title}
              description={alert.description}
            />
          )}
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
