import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import Activity from '../Models/Activity';

export default observer(
    (act: Activity) => {

        return (
            <section className="activity">
                <div className="time-container">
                    <time>{moment(act.time).format('HH:mm')}</time>
                </div>
                <span className="title">{act.title}</span>
                <div className="subtitle">
                    <span className="feeling-label">Feeling:</span>
                    <div className="feeling-mood" data-mood={act.feeling}>
                        <span>{act.feeling.toUpperCase()}</span>
                    </div>
                </div>
            </section>  
        )   
    }
);