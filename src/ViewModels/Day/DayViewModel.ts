import { computed, makeObservable, observable, reaction } from "mobx";
import moment from "moment";

import Activity from "../../Models/Activity";
import Feelings from "../../Models/Feelings";
import ActivitiesStore from "../../Stores/ActivitiesStore";
import NavigationViewModel, { DisplayModes } from "../NavigationViewModel";

export default class DayViewModel {

    //#region properties
    @observable
    public selectedActivities: Activity[] = [];
    
    @observable
    public currentlyEditing?: Activity;

    @computed
    get activities(): Activity[] {
        return this.store.activities;
    }
    //#endregion

    constructor(
        private store: ActivitiesStore,
        private navVM: NavigationViewModel
    ) {
        makeObservable(this);

        reaction(
            () => this.navVM.displayMode,
            mode => {
                switch(mode) {
                    case DisplayModes.deleteAll:
                        this.selectedActivities.forEach(act => store.delete(act));
                        this.selectedActivities = [];
                        break;
                    case DisplayModes.creating:
                        this.currentlyEditing = new Activity(
                            "",
                            "",
                            Feelings.great,
                            moment().format(),
                            []
                        );
                        break;
                    case DisplayModes.none:
                        this.selectedActivities = [];
                        break;
                }
            }
        );

        reaction(
            () => this.selectedActivities.length,
            length => {
                if (length > 0) {
                    this.navVM.displayMode = DisplayModes.selecting;
                } else {
                    this.navVM.displayMode = DisplayModes.none;
                }
            }
        );
    }

    public delete(act: Activity) {
        this.store.delete(act);
    }

}