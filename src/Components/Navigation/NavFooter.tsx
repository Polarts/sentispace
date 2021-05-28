import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useActivitiesStore } from '../../Stores/ActivitiesStore';
import Activity from '../../Models/Activity';
import Feelings from '../../Models/Feelings';
import moment from 'moment';
import NavigationViewModel, { SelectModes } from '../../ViewModels/NavigationViewModel';

type NavFooterProps = {
    vm: NavigationViewModel
}

export default observer(
    ({vm}: NavFooterProps) => {

        const store = useActivitiesStore();

        function onCenterButtonClicked() {
            if (vm.selectMode === SelectModes.selecting) {
                vm.selectMode = SelectModes.none;
            } else {
                store.currentlyEditing = new Activity(
                    "",
                    "",
                    Feelings.great,
                    moment().format(),
                    []
                );
            }
        }

        return (
            <footer className="nav-footer">
                <nav>
                    <button className="fab button-secondary"
                            disabled={!vm.hasPrev || vm.selectMode === SelectModes.selecting}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="fab button-primary" 
                            onClick={onCenterButtonClicked}>
                        <i className={`fas fa-plus${vm.selectMode === SelectModes.selecting? ' rotated' : ''}`}></i>
                    </button>
                    <button className="fab button-secondary"
                            disabled={!vm.hasNext || vm.selectMode === SelectModes.selecting}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
                <div className="bottom-filler"></div>
            </footer>
        );
    }
);