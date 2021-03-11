import {observable, computed, IObservableArray, action} from 'mobx';
import moment from 'moment';
import Activity from '../Models/Activity';
import FeelingsEnum from '../Models/FeelingsEnum';

export const DATE_FORMAT = 'YYYY-MM-DD';

export default class ActivitiesStore {

    //#region properties

    @observable
    private _activities: IObservableArray<Activity> = observable.array<Activity>();

    @computed
    public get activities(): Activity[] {
        return this._activities
            .filter(this.filterActivity)
            .sort((a, b) => Math.sign(moment(a.time).diff(moment(b.time), 'minutes')));
    }

    @observable
    public startDate: string = '';

    @observable
    public endTime: string = '';

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

    private filterActivity(act: Activity): boolean {

        const store = ActivitiesStore.instance;
        const date = moment(act.time).format(DATE_FORMAT);

        if (act.tags.every(tag => store.selectedTags.includes(tag))) {
            
            if (store.startDate === store.endTime && date === store.startDate) {
                return true;
            }
            
            if (date <= store.endTime && date >= store.startDate) {
                return true;
            }
        }
        return false;
    }

    @action
    public init(): void {
        // MOCK
        // TODO retrieve actual data from server
        // TODO think of pagination logic
        this.tags = [
            'health', 
            'fitness', 
            'food'
        ];
        this.selectedTags = observable.array(this.tags);

        for (let i=0; i<5; i++) {
            const rng = Math.random();
            this._activities.push(new Activity(
                "Lorem ipsum dolor sit amet!",
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui cupiditate similique, repellat alias veniam reprehenderit debitis maiores, architecto modi repellendus delectus saepe assumenda vero obcaecati adipisci nisi eius fugiat porro.",
                FeelingsEnum.ok,
                moment().add(rng, 'hours').format(),
                [],
                `act_${rng}`
            ));
            console.log(this._activities[i]);
        }

        this.startDate = this.endTime = moment().format(DATE_FORMAT);
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
        let updateIdx = this._activities.findIndex(a => a.id === act.id);
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