import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from '../ActivityItem';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';

export default observer(
    () => {

        const store = useActivitiesStore();

        function activitySelected() {
            console.log('selected');
        }

        return (
            <main>
                {store.activities.map(act => 
                    <ActivityItem key={act.id}
                                  activity={act} 
                                  onSelected={activitySelected}/> 
                )}
            </main>
        );
    }
);

