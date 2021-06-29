import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import moment from 'moment';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { CSSTransition } from 'react-transition-group';

import Activity from '../../Data/Models/Activity';
import DayViewModel from '../../ViewModels/Day/DayViewModel';

type ActivityItemProps = {
    activity: Activity,
    dayVM: DayViewModel
};

export default observer(
    ({activity, dayVM}: ActivityItemProps) => {

        const sectionRef = useRef<HTMLElement>(null);
        const isSelected = computed(() => dayVM.selectedActivities.includes(activity));
        const momentTime = moment(activity.time);
        const [hammerInit, setHammerInit] = useState(false); // Used to bypass dependency on isSelected

        useEffect(() => {
            if (sectionRef.current && !hammerInit) {
                const hammer = new Hammer(sectionRef.current);
                hammer.add(new Hammer.Press({
                    event: 'press',
                    time: 500,
                }));
                hammer.add(new Hammer.Tap({
                    time: 150,
                    taps: 1,
                    posThreshold: 30
                }));
                hammer.on('press', () => {
                    if (!isSelected.get()) {
                        dayVM.selectedActivities.push(activity);
                    }
                });
                hammer.on('tap', () => {
                    if (dayVM.selectedActivities.length > 0) {
                        if (isSelected.get()) {
                            dayVM.selectedActivities = dayVM.selectedActivities.without(activity);
                        } else {
                            dayVM.selectedActivities.push(activity); 
                        }
                    }
                });
                setHammerInit(true);
            }
        }, [activity, dayVM, isSelected, hammerInit]);

        function onEditClick() {
            dayVM.selectedActivities = dayVM.selectedActivities.without(activity);
            dayVM.currentlyEditing = activity;
        }

        function onRemoveClick() {
            dayVM.selectedActivities = dayVM.selectedActivities.without(activity);
            dayVM.delete(activity);
        }

        const SelectedParts = () => {
            return <div className="selected-parts">
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
        }

        return (
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
                <CSSTransition classNames="translate-x" 
                               in={isSelected.get()}
                               timeout={200}
                               unmountOnExit>
                    <SelectedParts/>
                </CSSTransition>
            </section>  
        )   
    }
);