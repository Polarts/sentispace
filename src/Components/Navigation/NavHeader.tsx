import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useLocation } from 'react-router';

import { Routes } from '../../App';
import { CSSTransition } from 'react-transition-group';
import NavigationViewModel, { DisplayModes } from '../../Data/ViewModels/NavigationViewModel';
import NavMenuItem from './NavMenuItem';
import ActivitiesStore from '../../Data/Stores/ActivitiesStore';

type NavHeaderProps = {
    vm: NavigationViewModel
}

export default observer(
    ({vm}: NavHeaderProps) => {
        
        const location = useLocation();
        const store = ActivitiesStore.instance;

        function onLeftButtonClicked() {
            if (vm.displayMode === DisplayModes.selecting) {
                vm.displayMode = DisplayModes.none;
            } else {
                vm.rightMenuOpen = false;
                vm.leftMenuOpen = !vm.leftMenuOpen;
            }
        }

        function onRightButtonClicked() {
            if (vm.displayMode === DisplayModes.selecting) {
                vm.displayMode = DisplayModes.deleteAll;
            } else {
                vm.leftMenuOpen = false;
                vm.rightMenuOpen = !vm.rightMenuOpen;
            }
        }

        function onMenuButtonClick() {
            vm.rightMenuOpen = vm.leftMenuOpen = false;
        }

        function Title() {
            if (vm.displayMode === DisplayModes.selecting) {
                return (
                    <h1>
                        <span>SELECTING</span>
                    </h1>
                );
            }
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

        function LeftIcon() {
            let className = 'fas fa-';

            if (vm.displayMode === DisplayModes.selecting) {
                className += 'window-close';
            } else if (vm.leftMenuOpen) {
                className += 'times';
            } else {
                className += 'calendar';
                switch(location.pathname) {
                    case Routes.day:
                        className += '-day';
                        break;
                    case Routes.week:
                        className += '-week';
                        break;
                    case Routes.month:
                        className += '-alt';
                        break;
                }
            }

            return <i className={className}/>
        }

        return (
            <header>
                <nav className="nav-header">
                    <button className="nav-menu-button action-button"
                            onClick={onLeftButtonClicked}>
                        <LeftIcon/>
                    </button>
                    <Title/>
                    <button className="nav-menu-button action-button"
                            onClick={onRightButtonClicked}>
                        <i className={`fas ${
                            vm.displayMode === DisplayModes.selecting
                            ? 'fa-trash-alt' 
                            : vm.rightMenuOpen
                                ? 'fa-times'
                                : 'fa-caret-square-down'
                        }`}/>
                    </button>
                    <div className="nav-menus">
                        <CSSTransition classNames="inflate" 
                                       in={vm.leftMenuOpen}
                                       timeout={300}
                                       unmountOnExit>
                            <ul className="nav-menu left">
                                <NavMenuItem icon="fa-calendar-day" text="Day View" route={Routes.day} onClick={onMenuButtonClick}/>
                                <NavMenuItem icon="fa-calendar-week" text="Week View" route={Routes.week} onClick={onMenuButtonClick}/>
                                <NavMenuItem icon="fa-calendar-alt" text="Month View" route={Routes.month} onClick={onMenuButtonClick}/>
                            </ul>
                        </CSSTransition>
                        <CSSTransition classNames="inflate" 
                                       in={vm.rightMenuOpen}
                                       timeout={300}
                                       unmountOnExit>
                            <ul className="nav-menu right">
                                <NavMenuItem icon="fa-cog" text="Settings" route={Routes.settings} onClick={onMenuButtonClick}/>
                                <NavMenuItem icon="fa-info-circle" text={"Help & About"} route={Routes.about} onClick={onMenuButtonClick}/>
                                <NavMenuItem icon="fa-filter" text="Filter" route={Routes.login} onClick={onMenuButtonClick}/>
                            </ul>
                        </CSSTransition>
                    </div>
                </nav>
            </header>
        );
    }
);