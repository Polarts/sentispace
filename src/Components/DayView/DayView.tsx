import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from './ActivityItem';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';
import ActivityForm from './ActivityForm';
import ActivityFormViewModel from '../../ViewModels/Day/ActivityFormViewModel';
import { CSSTransition } from 'react-transition-group';
import DayViewModel from '../../ViewModels/Day/DayViewModel';

type DayViewProps = {
    vm: DayViewModel
}

export default observer(
    ({vm}: DayViewProps) => {

        const store = useActivitiesStore();

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
                    <ActivityForm vm={new ActivityFormViewModel(store, vm.currentlyEditing)}/>
                </CSSTransition>
            </>
        );
    }
);

