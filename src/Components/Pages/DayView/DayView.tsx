import React from 'react';
import { observer } from 'mobx-react';
import { AnimatePresence } from 'framer-motion';

import ActivityItem from './ActivityItem';
import NewActivityPage from './NewActivityPage';
import ActivitiesStore from '../../../Data/Stores/ActivitiesStore';
import ActivityFormViewModel from '../../../Data/ViewModels/Day/ActivityFormViewModel';
import DayViewModel from '../../../Data/ViewModels/Day/DayViewModel';
import DetailsPage from '../Activity/DetailsPage';

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
                <AnimatePresence initial={false}>
                    {!!vm.currentlyEditing && (
                        <NewActivityPage vm={new ActivityFormViewModel(store, vm.currentlyEditing)} dayVM={vm}/>
                    )}
                    {!!vm.currentlyViewing && (
                        <DetailsPage activity={vm.currentlyViewing}/>
                    )}
                </AnimatePresence>
            </>
        );
    }
);

