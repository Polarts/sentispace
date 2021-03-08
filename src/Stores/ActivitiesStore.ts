import {observable, computed, IObservableArray, action} from 'mobx';
import Activity from '../Models/Activity';

export default class ActivitiesStore {

    //#region properties

    //#region properties

    @observable
    private _activities: IObservableArray<Activity> = observable.array<Activity>();

    @computed
    public get activities(): Activity[] {
        return this._activities
            .filter(act => 
                act.time < this.endTime 
                && act.time > this.startTime 
                && act.tags.every(tag => this.selectedTags.includes(tag))
            );
    }

    @observable
    public startTime: Date = new Date();

    @observable
    public endTime: Date = new Date();

    @observable
    public tags: string[] = [];

    @observable
    public selectedTags: IObservableArray<string> = observable.array<string>();

    //#endregion

    //#region singleton

    private static _instance: ActivitiesStore;

    private constructor(){}

    public static get instance(){ 
        return this._instance ?? (this._instance = new ActivitiesStore()); 
    }

    //#endregion

    //#region methods

    @action
    public init(): void {
        // THIS IS MOCK FOR TEST
        // TODO retrieve actual data from server
        // TODO think of pagination logic
        this.tags = [
            'health', 
            'fitness', 
            'food'
        ];
        this.selectedTags = observable.array(this.tags);
    }

    @action
    public create(act: Activity) {
        // MOCK
        // TODO create on server
        act.id = `act_${this._activities.length}`;
        this._activities.push(act);
    }

    @action
    public update(act: Activity) {
        // MOCK
        // TODO update on server
        let updateIdx = this._activities.findIndex(a => a.id == act.id);
        this._activities[updateIdx] = act;
    }

    @action
    public delete(act: Activity) {
        // MOCK
        // TODO delete from server
        this._activities.remove(act);
    }

    //#endregion
}