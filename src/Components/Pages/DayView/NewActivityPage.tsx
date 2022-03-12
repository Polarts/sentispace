import React from 'react';
import { observer } from 'mobx-react';
import { motion } from 'framer-motion';

import ActivityFormViewModel from '../../../Data/ViewModels/Day/ActivityFormViewModel';
import DayViewModel from '../../../Data/ViewModels/Day/DayViewModel';
import { translateY } from '../../../Utils/MotionAnimations';
import { useFormSubmit } from '../../../Hooks/useFormSubmit';
import ActivityEditForm from '../Activity/ActivityEditForm';
import NavigationViewModel, { DisplayModes } from '../../../Data/ViewModels/NavigationViewModel';

type ActivitiesFormProps = {
    vm: ActivityFormViewModel,
    dayVM: DayViewModel
}

export default observer(
    ({vm, dayVM}: ActivitiesFormProps) => {

        const {isWaiting, onSubmit} = useFormSubmit(vm, onCancel, onCancel);

        function onCancel() {
            dayVM.currentlyEditing = undefined;
            dayVM.selectedActivities = [];
        }

        return (
            <motion.form className="activity-form" onSubmit={onSubmit}
                         {...translateY}>
                <div className="header">
                    NEW ACTIVITY
                </div>
                <ActivityEditForm vm={vm} isAnimated={false}/>
                <div className="nav-footer">
                    {
                        isWaiting
                        ? <div className="content">
                            <div className="fab" style={{background: "lightgray"}}>
                                <i className="fas fa-sync rotating"></i>
                            </div>
                          </div>
                        : <div className="content">
                            <button className="fab button-secondary"
                                    type="reset"
                                    onClick={onCancel}>
                                <i className="fas fa-times"></i>
                            </button>
                            <button className="fab button-secondary"
                                    type ="submit">
                                <i className="fas fa-check"></i>
                            </button>
                          </div> 
                    }
                    <div className="bottom-filler"/>
                </div>
            </motion.form>
            
        );
    }
);