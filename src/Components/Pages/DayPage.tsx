import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from '../ActivityItem';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';
import { Route, Switch, useLocation } from 'react-router';
import { Routes } from '../../App';
import ActivityForm from '../ActivityForm';
import ActivityFormViewModel from '../../ViewModels/ActivityFormViewModel';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default observer(
    () => {

        const store = useActivitiesStore();
        const location = useLocation();

        return (
            <>
                <main>
                    {store.activities.map(act => 
                        <ActivityItem key={act.id}
                                    activity={act} /> 
                    )}
                </main>
                <CSSTransition classNames="translateY" 
                               in={store.currentlyEditing != undefined}
                               timeout={300}
                               unmountOnExit>
                    <ActivityForm vm={new ActivityFormViewModel(store, store.currentlyEditing)}/>
                </CSSTransition>
            </>
        );
    }
);

