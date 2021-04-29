import React, { useState } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useActivitiesStore } from '../Stores/ActivitiesStore';
import { useLocation } from 'react-router';
import { Routes } from '../App';
import { CSSTransition } from 'react-transition-group';

export default observer(
    () => {
        
        const store = useActivitiesStore();
        const location = useLocation();

        const [menuStates, setMenuStates] = useState({left: false, right: false});

        function onLeftButtonClicked() {
            if (store.selectMode) {

            } else {
                setMenuStates({left: !menuStates.left, right: false});
            }
        }

        function onRightButtonClicked() {
            if (store.selectMode) {
                store.selectedActivities = [];
            } else {
                setMenuStates({left: false, right: !menuStates.right});
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

        type MenuItmeProps = {
            icon: string,
            text: string,
            route: Routes
        };

        function MenuItem({ icon, text, route}: MenuItmeProps) {
            return (
                <li>
                    <a href={route} 
                       className={`nav-menu-item${location.pathname === route? ' selected' : ''}`}>
                        <i className={`fas ${icon}`}></i>
                        <span>{text}</span>
                    </a>
                </li>
            );
        }

        return (
            <header>
                <nav className="nav-header">
                    <button className="nav-menu-button action-button"
                            onClick={onLeftButtonClicked}>
                        <i className={`fas ${
                            store.selectMode
                                ? 'fa-trash-alt' 
                                : menuStates.left
                                    ? 'fa-times'
                                    : 'fa-calendar-day'
                            }`}/>
                    </button>
                    <Title/>
                    <button className="nav-menu-button action-button"
                            onClick={onRightButtonClicked}>
                        <i className={`fas ${
                            store.selectMode
                            ? 'fa-window-close' 
                            : menuStates.right
                                ? 'fa-times'
                                : 'fa-caret-square-down'
                        }`}/>
                    </button>
                    <div className="nav-menus">
                        <CSSTransition classNames="inflate" 
                                       in={menuStates.left}
                                       timeout={300}
                                       unmountOnExit>
                            <ul className="nav-menu left">
                                <MenuItem icon="fa-calendar-day" text="Day View" route={Routes.day}/>
                                <MenuItem icon="fa-calendar-week" text="Week View" route={Routes.week}/>
                                <MenuItem icon="fa-calendar-alt" text="Month View" route={Routes.month}/>
                            </ul>
                        </CSSTransition>
                        <CSSTransition classNames="inflate" 
                                       in={menuStates.right}
                                       timeout={300}
                                       unmountOnExit>
                            <ul className="nav-menu right">
                                <MenuItem icon="fa-cog" text="Settings" route={Routes.settings}/>
                                <MenuItem icon="fa-info-circle" text="About" route={Routes.about}/>
                                <MenuItem icon="fa-sign-out-alt" text="Logout" route={Routes.login}/>
                            </ul>
                        </CSSTransition>
                    </div>
                </nav>
            </header>
        );
    }
);