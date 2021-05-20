import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from './ActivityItem';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';
import ActivityForm from './ActivityForm';
import ActivityFormViewModel from '../../ViewModels/ActivityFormViewModel';
import { CSSTransition } from 'react-transition-group';

export default observer(
    () => {

        const store = useActivitiesStore();

        return (
            <>
                <main>
                    {store.activities.map(act => 
                        <ActivityItem key={act.id}
                                      activity={act} /> 
                    )}
                </main>
                <CSSTransition classNames="translate-y" 
                               in={store.currentlyEditing !== undefined}
                               timeout={300}
                               unmountOnExit>
                    <ActivityForm vm={new ActivityFormViewModel(store, store.currentlyEditing)}/>
                </CSSTransition>
            </>
        );
    }
);

