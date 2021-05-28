import { computed, makeObservable, observable, reaction, when } from "mobx";
import Activity from "../../Models/Activity";
import ActivitiesStore from "../../Stores/ActivitiesStore";
import NavigationViewModel, { SelectModes } from "../NavigationViewModel";

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
        private navHeader: NavigationViewModel
    ) {
        makeObservable(this);

        reaction(
            () => this.navHeader.selectMode,
            mode => {
                switch(mode) {
                    case SelectModes.deleteAll:
                        this.selectedActivities.forEach(act => store.delete(act));
                        this.selectedActivities = [];
                        break;
                    case SelectModes.none:
                        this.selectedActivities = [];
                        break;
                }
            }
        );

        reaction(
            () => this.selectedActivities.length,
            length => {
                if (length > 0) {
                    this.navHeader.selectMode = SelectModes.selecting;
                } else {
                    this.navHeader.selectMode = SelectModes.none;
                }
            }
        )
    }

    public delete(act: Activity) {
        this.store.delete(act);
    }

}