import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useActivitiesStore } from '../Stores/ActivitiesStore';
import { useLocation } from 'react-router';
import { Routes } from '../App';

export default observer(
    () => {
        
        const store = useActivitiesStore();
        const location = useLocation();

        function onLeftButtonClicked() {

        }

        function onRightButtonClicked() {
            if (store.selectMode) {
                store.selectedActivities = [];
            }
        }

        function Title() {
            switch(location.pathname) {
                case Routes.day:
                    return (
                        <h1>
                            <span>{moment(store.startDate).format('dddd').toUpperCase()}</span>
                            <span>{moment(store.startDate).format('DD MMM yyyy')}</span>
                        </h1>
                    );
                case Routes.edit:
                    return (
                        <h1>
                            <span>EDITING</span>
                        </h1>
                    )
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
                    <button className="nav-menu-button action-button"
                            onClick={onLeftButtonClicked}>
                        <i className={`fas ${store.selectMode? 'fa-trash-alt' : 'fa-calendar-day'}`}/>
                    </button>
                    <Title/>
                    <button className="nav-menu-button action-button"
                            onClick={onRightButtonClicked}>
                        <i className={`fas ${store.selectMode? 'fa-window-close' : 'fa-caret-square-down'}`}/>
                    </button>
                </nav>
            </header>
        );
    }
);