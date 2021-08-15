import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { AnimatePresence, motion } from 'framer-motion';

import { translateX } from '../../../Utils/MotionAnimations';
import Activity from '../../../Data/Models/Activity';
import ActivityFormViewModel from '../../../Data/ViewModels/Day/ActivityFormViewModel';
import ActivitiesStore from '../../../Data/Stores/ActivitiesStore';
import { useFormSubmit } from '../../../Hooks/useFormSubmit';
import ActivityEditForm from './ActivityEditForm';
import { ActivityView } from './ActivityView';

type DetailsPageProps = {
    activity: Activity
}

export default observer(
    ({ activity }: DetailsPageProps) => {

        const formVM = new ActivityFormViewModel(ActivitiesStore.instance, activity);
        const [isEditMode, setEditMode] = useState(false);
        const {isWaiting, onSubmit} = useFormSubmit(formVM, onCancelEdit)


        function onCancelEdit() {

        }

        return (
            <motion.form className="activity-form" onSubmit={onSubmit}
                        {...translateX}>
                <div className="header">
                    {isEditMode? "Editing Activity" : "Activity Details"}
                </div>
                <AnimatePresence initial={false}>
                    {isEditMode
                        ? <ActivityEditForm vm={formVM}/>
                        : <ActivityView activity={activity}/>
                    }
                </AnimatePresence>
                <div className="nav-footer">
                    <div className="bottom-filler"/>
                </div>
            </motion.form>
        );
    }
);