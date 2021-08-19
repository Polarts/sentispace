import React from 'react';
import { observer } from 'mobx-react';

import NavigationViewModel, { DisplayModes } from '../../Data/ViewModels/NavigationViewModel';

type NavFooterProps = {
    vm: NavigationViewModel
}

export default observer(
    ({vm}: NavFooterProps) => {

        function onCenterButtonClicked() {
            if (vm.displayMode === DisplayModes.selection) {
                vm.displayMode = DisplayModes.none;
            } else {
                vm.displayMode = DisplayModes.creation;
            }
        }

        return (
            <footer className="nav-footer">
                <nav>
                    <button className="fab button-secondary"
                            onClick={vm.prevCallback}
                            disabled={!vm.prevCallback || !vm.hasPrev || vm.displayMode === DisplayModes.selection}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="fab button-primary" 
                            onClick={onCenterButtonClicked}>
                        <i className={`fas fa-plus${vm.displayMode === DisplayModes.selection? ' rotated' : ''}`}></i>
                    </button>
                    <button className="fab button-secondary"
                            onClick={vm.nextCallback}
                            disabled={!vm.nextCallback || !vm.hasNext || vm.displayMode === DisplayModes.selection}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
                <div className="bottom-filler"></div>
            </footer>
        );
    }
);