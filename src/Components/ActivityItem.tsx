import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import { observer } from 'mobx-react';
import moment from 'moment';
import Activity from '../Models/Activity';
import useGlobalClick from '../Hooks/useGlobalClick';

type ActivityItemProps = {
    activity: Activity,
    onSelected?: () => void
};

export default observer(
    ({activity, onSelected}: ActivityItemProps) => {

        const [selected, setSelected] = useState(false);
        const sectionRef = useRef<HTMLSelectElement>(null);
        // TODO find better way
        const unregisterGlobal = useGlobalClick(() => setSelected(false));


        useEffect(() => {
            if (sectionRef.current) {
                const hammer = new Hammer(sectionRef.current as HTMLElement);
                hammer.add(new Hammer.Press({
                    event: 'press',
                    time: 500,
                }));
                hammer.on('press', () => {
                    setSelected(true);
                    if (onSelected) {
                        onSelected();
                    }
                })
            }

            return unregisterGlobal;
        }, [onSelected]);

        const SelectedParts = () => (
            <>
                <button className="edit action-button"><i className="fas fa-pen-square"></i></button>
                <button className="delete action-button"><i className="fas fa-minus-square"></i></button>
                <div className="selected"></div>
            </>
        );

        return (
            <section className="activity" 
                     ref={sectionRef}>
                <div className="time-container">
                    <time>{moment(activity.time).format('HH:mm')}</time>
                </div>
                <span className="title">{activity.title}</span>
                <div className="subtitle">
                    <span className="feeling-label">Feeling:</span>
                    <div className="feeling-mood" data-mood={activity.feeling}>
                        <span>{activity.feeling.toUpperCase()}</span>
                    </div>
                </div>
                {selected? <SelectedParts/> : null}
            </section>  
        )   
    }
);