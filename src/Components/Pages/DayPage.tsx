import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from '../ActivityItem';
import ActivitiesStore from '../../Stores/ActivitiesStore';

export default observer(
    () => {

        const store = ActivitiesStore.instance;

        return (
            <main>
                {store.activities.map(act => <ActivityItem {...act} key={act.id}/> )}
            </main>
        );
    }
);

