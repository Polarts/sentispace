import React from 'react';
import { observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';

import ActivityItem from './ActivityItem';
import ActivityForm from './ActivityForm';
import ActivitiesStore from '../../../Data/Stores/ActivitiesStore';
import ActivityFormViewModel from '../../../ViewModels/Day/ActivityFormViewModel';
import DayViewModel from '../../../ViewModels/Day/DayViewModel';

type DayViewProps = {
    vm: DayViewModel
}

export default observer(
    ({vm}: DayViewProps) => {

        const store = ActivitiesStore.instance;

        return (
            <>
                <main>
                    {vm.activities.map(act => 
                        <ActivityItem key={act.id}
                                      activity={act}
                                      dayVM={vm} /> 
                    )}
                </main>
                <CSSTransition classNames="translate-y" 
                               in={vm.currentlyEditing !== undefined}
                               timeout={300}
                               unmountOnExit>
                    <ActivityForm vm={new ActivityFormViewModel(store, vm.currentlyEditing)} dayVM={vm}/>
                </CSSTransition>
            </>
        );
    }
);

