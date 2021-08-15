import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';

import Activity from '../../../Data/Models/Activity';
import { fade } from '../../../Utils/MotionAnimations';

type ActivityViewProps = {
    activity: Activity
}

export const ActivityView = ({ activity }: ActivityViewProps) => (
  <motion.div className="form-body read-only" {...fade}>
    <div className="title">
        <div className="time-container" 
            data-tod={Math.floor(moment.unix(activity.time).hour() / 3.1)}>
            <time>{moment.unix(activity.time).format('HH:mm')}</time>
        </div>
        <span className="title">{activity.title}</span>
    </div>
    <div className="subtitle">
        <span className="feeling-label">Feeling:</span>
        <div className="feeling-mood" data-mood={activity.feeling}>
            <span>{activity.feeling.toUpperCase()}</span>
        </div>
    </div>
    <div className="description">
        {activity.description}
    </div>
  </motion.div>
);