import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useActivitiesStore } from '../Stores/ActivitiesStore';
import { useLocation } from 'react-router';
import Routes from '../RoutesEnum';

export default observer(
    () => {
        
        const store = useActivitiesStore();
        const location = useLocation();
        
        function Title() {
            switch(location.pathname) {
                case Routes.day:
                    return (
                        <h1>
                            <span>{moment(store.startDate).format('dddd').toUpperCase()}</span>
                            <span>{moment(store.startDate).format('DD MMM yyyy')}</span>
                        </h1>
                    );
                default:
                    return ( 
                        <h1>
                            <span>404</span>
                            <span>Page Not Found</span>
                        </h1>
                    );
            }
        }

        return (
            <header>
                <nav className="nav-header">
                    <button className="nav-menu-button action-button">
                        <i className="fas fa-calendar-day"></i>
                    </button>
                    <Title/>
                    <button className="nav-menu-button action-button">
                        <i className="fas fa-caret-square-down"></i>
                    </button>
                </nav>
            </header>
        );
    }
);