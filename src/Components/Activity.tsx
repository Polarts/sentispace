import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import Activity from '../Models/Activity';

type ActivityProps {
    model: Activity
}

export default observer(
    ({model}: ActivityProps) => {

        return (
            <section className="activity">
                <div className="time-container">
                    <time>{moment(model.time).format('HH:mm')}</time>
                </div>
                <span className="title">{model.title}</span>
                <div className="subtitle">
                    <span className="feeling-label">Feeling:</span>
                    <div className="feeling-mood" data-mood={model.feeling}>
                        <span>{model.feeling.toUpperCase()}</span>
                    </div>
                </div>
            </section>  
        )   
    }
);