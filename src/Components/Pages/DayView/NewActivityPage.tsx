import React, { useState } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { motion } from 'framer-motion';

import ActivityFormViewModel from '../../../Data/ViewModels/Day/ActivityFormViewModel';
import Feelings from '../../../Data/Models/Feelings';
import DayViewModel from '../../../Data/ViewModels/Day/DayViewModel';
import { exclude } from '../../../Utils/ArrayHelpers';
import { translateY } from '../../../Utils/MotionAnimations';
import { useFormSubmit } from '../../../Hooks/useFormSubmit';
import ActivityEditForm from '../Activity/ActivityEditForm';

type ActivitiesFormProps = {
    vm: ActivityFormViewModel,
    dayVM: DayViewModel
}

export default observer(
    ({vm, dayVM}: ActivitiesFormProps) => {

        const [currentTag, setCurrentTag] = useState('');
        const {isWaiting, onSubmit} = useFormSubmit(vm, onCancel);

        function onFeelingSelected(e: React.ChangeEvent<HTMLInputElement>) {
            vm.feeling = e.currentTarget.value as Feelings;
        }

        function onTagsKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                if (!!currentTag && /\S/.test(currentTag)) {
                    vm.addTag(currentTag);
                    setCurrentTag('');
                }
            }
        }

        function onCancel() {
            dayVM.currentlyEditing = undefined;
            dayVM.selectedActivities = [];
        }

        return (
            <motion.form className="activity-form" onSubmit={onSubmit}
                         {...translateY}>
                <div className="header">
                    {vm.id? "EDIT ACTIVITY" : "NEW ACTIVITY"}
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