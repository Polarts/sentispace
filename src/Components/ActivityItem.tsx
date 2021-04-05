import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import { observer } from 'mobx-react';
import moment from 'moment';
import Activity from '../Models/Activity';
import { useActivitiesStore } from '../Stores/ActivitiesStore';
import { observe } from 'mobx';
import { CSSTransition } from 'react-transition-group';

type ActivityItemProps = {
    activity: Activity
};

export default observer(
    ({activity}: ActivityItemProps) => {

        const sectionRef = useRef<HTMLElement>(null);

        const momentTime = moment(activity.time);

        const store = useActivitiesStore();

        useEffect(() => {
            if (sectionRef.current) {
                const hammer = new Hammer(sectionRef.current);
                hammer.add(new Hammer.Press({
                    event: 'press',
                    time: 500,
                }));
                hammer.on('press', () => {
                    store.selectedActivities.push(activity);
                })
            }
        }, [activity, store.selectedActivities]);

        function onEditClick() {
            store.selectedActivities = store.selectedActivities.removef(activity);
            store.currentlyEditing = activity;
        }

        function onRemoveClick() {
            store.selectedActivities = store.selectedActivities.removef(activity);
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
                               in={store.selectedActivities.includes(activity)}
                               timeout={300}
                               unmountOnExit>
                    <SelectedParts/>
                </CSSTransition>
            </section>  
        )   
    }
);