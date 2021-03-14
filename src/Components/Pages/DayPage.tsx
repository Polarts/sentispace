import React from 'react';
import { observer } from 'mobx-react';
import ActivityItem from '../ActivityItem';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';
import MessagingService, { Message } from '../../Services/MessagingService';

export default observer(
    () => {

        const store = useActivitiesStore();

        function activitySelected() {
            MessagingService.instance.send(Message.actSelected);
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

