import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from '../ActivityItem';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';
import { Route, Switch } from 'react-router';
import { Routes } from '../../App';
import ActivityForm from '../ActivityForm';
import ActivityFormViewModel from '../../ViewModels/ActivityFormViewModel';

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
            </>
        );
    }
);

