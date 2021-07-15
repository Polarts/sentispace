import { 
    action,
    computed,
    makeObservable, 
    observable, 
    reaction 
} from "mobx";
import moment, { Moment } from "moment";

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

    @observable
    private currentDate: Moment = moment().startOf('day');

    @computed
    public get activities() {
        return this.store.activities.slice();
    }

    //#endregion

    constructor(
        private store: ActivitiesStore,
        private navVM: NavigationViewModel
    ) {
        makeObservable(this);

        navVM.nextCallback = () => this.next();
        navVM.prevCallback = () => this.prev();
        this.onDateUpdated(this.currentDate);

        reaction(
            () => this.currentDate,
            date => this.onDateUpdated(date)
        )

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
                            moment().unix(),
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

        reaction(
            () => this.currentlyEditing,
            editing => {
                if (!editing) {
                    this.navVM.displayMode = DisplayModes.none;
                }
            }
        );
    }

    //#region methods
    
    public delete(act: Activity) {
        this.store.delete(act);
    }
    
    @action
    public next() {
        this.currentDate = this.currentDate.clone().add(1, 'days');
    }

    @action
    public prev() {
        this.currentDate = this.currentDate.clone().subtract(1, 'days');
    }

    private onDateUpdated(date: Moment) {
        this.store.filterByDate(date);
        this.navVM.headerContent = [
            this.currentDate.format('dddd'),
            this.currentDate.format('DD MMM yyyy')
        ];
        this.navVM.hasNext = this.currentDate.startOf('day').unix() !== moment().startOf('day').unix();
    }

    //#endregion
}