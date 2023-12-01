import { useMemo, useReducer } from 'react';
import { IconKeyType, getRandomIconKey, iconKeys } from '../../../assets/icons';
import { IndexableType } from 'dexie';
import { Rating } from '../../../data/types/Rating';
import { addDays, isAfter, isFuture } from 'date-fns';
import { Activity } from '../../../data/interfaces';
import { deepEqual } from '../../../utils/comparison';
import {
    ActivityFormAlert,
    ActivityFormState,
    DefaultState,
} from './activityForm.types';
import { reducer } from './activityForm.reducer';
import { ActionType, ActivityFormAlerts } from './activityForm.enums';
import { copyDate } from '../../../utils/time';

const defaultState: DefaultState = {
    iconKey: getRandomIconKey,
    title: '',
    description: '',
    categoryIds: [],
    rating: 0,
    startTime: new Date(),
    endTime: undefined,
};

const useActivityForm = (activity?: Partial<Activity>) => {
    const initialState: ActivityFormState = {
        iconKey: activity?.iconKey || defaultState.iconKey(),
        title: activity?.title || defaultState.title,
        description: activity?.description || defaultState.description,
        categoryIds: activity?.categoryIds || defaultState.categoryIds,
        rating: activity?.rating || defaultState.rating,
        startTime: activity?.startTime || defaultState.startTime,
        endTime: activity?.endTime || defaultState.endTime,
        isNow: !activity?.id,
        alert: null,
        deleteGuard: !!activity,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        title,
        description,
        rating,
        startTime,
        endTime,
        isNow,
        deleteGuard,
        iconKey,
        categoryIds,
    } = state;

    const validations = {
        [ActivityFormAlerts.ICON_KEY]: iconKeys.includes(iconKey),
        [ActivityFormAlerts.TITLE]: title.length >= 1 && title.length <= 50,
        [ActivityFormAlerts.DESCRIPTION]:
            description.length >= 0 && description.length <= 250,
        [ActivityFormAlerts.RATING]: rating >= 0 && rating <= 5,
        [ActivityFormAlerts.CATEGORIES]: Array.isArray(categoryIds),
        [ActivityFormAlerts.START_TIME]: !isFuture(startTime),
        [ActivityFormAlerts.END_TIME]: !endTime || !isFuture(endTime),
    };

    const isChanged = useMemo(
        () =>
            !deepEqual(
                { ...initialState, deleteGuard: null, alert: null },
                { ...state, deleteGuard: null, alert: null }
            ),
        [initialState, state]
    );

    const setAlert = (alert: ActivityFormAlert) =>
        dispatch({ type: ActionType.SET_ALERT, payload: alert });

    const clearAlert = () => dispatch({ type: ActionType.CLEAR_ALERT });

    const setTime = (startTime: Date, endTime?: Date) => {
        dispatch({
            type: ActionType.SET_TIME,
            payload: { startTime, endTime, isNow },
        });
    };

    const setIcon = (iconKey: IconKeyType): void => {
        dispatch({
            type: ActionType.SET_ICON_KEY,
            payload: iconKey,
        });
    };

    const setTitle = (title: string): void => {
        dispatch({ type: ActionType.SET_TITLE, payload: title });
    };

    const setDescription = (description: string): void => {
        dispatch({ type: ActionType.SET_DESCRIPTION, payload: description });
    };

    const setCategories = (categoryIds: IndexableType[]): void => {
        dispatch({ type: ActionType.SET_CATEGORIES, payload: categoryIds });
    };

    const setRating = (rating: Rating): void => {
        dispatch({ type: ActionType.SET_RATING, payload: rating });
    };

    const setDate = (date: Date): void => {
        const adjustedStartTimeDate = copyDate(startTime, date);

        dispatch({
            type: ActionType.SET_START_TIME,
            payload: adjustedStartTimeDate,
        });

        if (!endTime) return;

        const adjustedEndTimeDate = copyDate(endTime, date);

        if (isAfter(startTime, endTime)) addDays(adjustedEndTimeDate, 1);

        dispatch({
            type: ActionType.SET_END_TIME,
            payload: adjustedEndTimeDate,
        });
    };

    const resetState = () =>
        dispatch({ type: ActionType.RESET, payload: initialState });

    const enableDeleteGuard = () =>
        dispatch({ type: ActionType.SET_DELETE_GUARD, payload: true });

    const disableDeleteGuard = () =>
        dispatch({ type: ActionType.SET_DELETE_GUARD, payload: false });

    return {
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
    };
};

export default useActivityForm;
