import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';

import Activity from '../../Models/Activity';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';

type ActivityItemProps = {
    activity: Activity
};

export default observer(
    ({activity}: ActivityItemProps) => {

        const sectionRef = useRef<HTMLElement>(null);
        const store = useActivitiesStore();
        const isSelected = computed(() => store.selectedActivities.includes(activity));
        const momentTime = moment(activity.time);
        
        useEffect(() => {
            if (sectionRef.current) {
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
                        store.selectedActivities.push(activity);
                    }
                });
                hammer.on('tap', () => {
                    if (store.selectMode) {
                        if (isSelected.get()) {
                            store.selectedActivities = store.selectedActivities.without(activity);
                        } else {
                            store.selectedActivities.push(activity); 
                        }
                    }
                });
            }
        }, []);

        function onEditClick() {
            store.selectedActivities = store.selectedActivities.without(activity);
            store.currentlyEditing = activity;
        }

        function onRemoveClick() {
            store.selectedActivities = store.selectedActivities.without(activity);
            store.delete(activity);
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