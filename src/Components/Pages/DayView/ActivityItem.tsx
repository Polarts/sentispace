import React, { useRef } from 'react';
import moment from 'moment';
import Hammer from 'react-hammerjs';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import Activity from '../../../Data/Models/Activity';
import DayViewModel from '../../../Data/ViewModels/Day/DayViewModel';
import { exclude } from '../../../Utils/ArrayHelpers';
import { AnimatePresence, motion } from 'framer-motion';
import { transition, translateX } from '../../../Utils/MotionAnimations';

type ActivityItemProps = {
    activity: Activity,
    dayVM: DayViewModel
};

export default observer(
    ({activity, dayVM}: ActivityItemProps) => {

        const sectionRef = useRef<HTMLElement>(null);
        const isSelected = computed(() => dayVM.selectedActivities.includes(activity));
        const momentTime = moment.unix(activity.time);

        function onPressed() {
            if (!isSelected.get()) {
                dayVM.selectedActivities.push(activity);
            }
        }

        function onTapped() {
            if (dayVM.selectedActivities.length > 0) {
                if (isSelected.get()) {
                    dayVM.selectedActivities = exclude(dayVM.selectedActivities, activity);
                } else {
                    dayVM.selectedActivities.push(activity); 
                }
            } else {
                dayVM.currentlyViewing = activity;
            }
        }

        function onEditClick() {
            dayVM.selectedActivities = exclude(dayVM.selectedActivities, activity);
            dayVM.currentlyEditing = activity;
        }

        function onRemoveClick() {
            dayVM.selectedActivities = exclude(dayVM.selectedActivities, activity);
            dayVM.delete(activity);
        }

        return (
            <Hammer onTap={onTapped} onPress={onPressed} options={{
                recognizers: {
                    tap: {
                        time: 150,
                        taps: 1,
                        posThreshold: 30
                    },
                    press: {
                        event: 'press',
                        time: 500,
                    }
                }
            }}>
                <section className="activity" ref={sectionRef}>
                    <div className="time-container" 
                        data-tod={Math.floor(momentTime.hour() / 3.1)}>
                        <time>{momentTime.format('HH:mm')}</time>
                    </div>
                    <span className="title">{activity.title}</span>
                    <div className="subtitle">
                        <span className="feeling-label">Feeling:</span>
                        <div className="feeling-mood" data-mood={activity.feeling}>
                            <span>{activity.feeling.toUpperCase()}</span>
                        </div>
                    </div>
                    {isSelected.get() && (
                        <div className='selected-parts'>
                            <button className="edit action-button"
                                        onClick={onEditClick}>
                                    <i className="fas fa-pen-square"></i>
                                </button>
                                <button className="delete action-button"
                                        onClick={onRemoveClick}>
                                    <i className="fas fa-minus-square"></i>
                                </button>
                                <div className="selected"></div>
                        </div>
                    )}
                </section>  
            </Hammer>
        )   
    }
);