import React from 'react';
import { observer } from 'mobx-react';
import Activity from '../../Models/Activity';
import FeelingsEnum from '../../Models/FeelingsEnum';
import ActivityItem from '../ActivityItem';

type DayPageProps = {

};

export default observer(
    (props: DayPageProps) => {

        const activities = [];
        for (let i=0; i<5; i++) {
            activities.push(new Activity(
                "Lorem ipsum dolor sit amet!",
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui cupiditate similique, repellat alias veniam reprehenderit debitis maiores, architecto modi repellendus delectus saepe assumenda vero obcaecati adipisci nisi eius fugiat porro.",
                FeelingsEnum.ok,
                new Date(),
                [],
                String(i)
            ));
        }

        return (
            <main>
                {activities.map(act => <ActivityItem model={act}/> )}
            </main>
        );
    }
);

