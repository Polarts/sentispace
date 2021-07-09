import {
    observable, 
    computed, 
    IObservableArray, 
    action, 
    makeObservable 
} from 'mobx';
import moment from 'moment';
import { without } from '../../Utils/ArrayHelpers';
import Database from '../Database';
import Activity from '../Models/Activity';
import Feelings from '../Models/Feelings';
import TagsStore from './TagsStore';

export const DATE_FORMAT = 'YYYY-MM-DD';

export default class ActivitiesStore {

    //#region singleton

    private static _instance: ActivitiesStore;

    private constructor() {
        makeObservable(this);
    }

    public static get instance(){ 
        return this._instance ?? (this._instance = new ActivitiesStore()); 
    }

    //#endregion

    //#region properties

    //#region activities

    @observable
    private _activities: Array<Activity> = [];

    @computed
    public get activities(): Array<Activity> {
        return this._activities
            .filter(this.filterActivity)
            .sort((a, b) => Math.sign(moment(a.time).diff(moment(b.time), 'minutes')));
    }
    
    //#endregion

    @observable
    public startDate: string = '';

    @observable
    public endDate: string = '';

    @observable
    public tags: string[] = [];

    @observable 
    public selectedTags: IObservableArray<string> = observable.array<string>();

    private isInit = false;
    
    private db!: Database;

    private tagsStore!: TagsStore;

    //#endregion

    //#region methods

    private filterActivity(act: Activity): boolean {

        const store = ActivitiesStore.instance;
        const date = moment(act.time).format(DATE_FORMAT);

        if (store.selectedTags.length === 0
            || act.tags.every(tag => store.selectedTags.includes(tag))) {

            if (store.startDate === store.endDate && date === store.startDate) {
                return true;
            }
            
            if (date <= store.endDate && date >= store.startDate) {
                return true;
            }
        }
        return false;
    }

    @action
    public init(db: Database, tagsStore: TagsStore): void {
        if (this.isInit) return;

        this.tagsStore = tagsStore;
        this.db = db;

        // const acts = [];
        // for (let i=0; i<5; i++) {
        //     const rng = Math.random() * 23;
        //     acts.push(new Activity(
        //         "Lorem ipsum dolor sit amet!",
        //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui cupiditate similique, repellat alias veniam reprehenderit debitis maiores, architecto modi repellendus delectus saepe assumenda vero obcaecati adipisci nisi eius fugiat porro.",
        //         Feelings.ok,
        //         moment().startOf('day').add(rng, 'hours').format(),
        //         []
        //     ));
        // }
        // db.activities.bulkAdd(acts);

        this.db.activities.toArray().then(arr => this._activities = arr);
        this.startDate = this.endDate = moment().format(DATE_FORMAT);
        this.isInit = true;
    }

    @action
    public async create(act: Activity): Promise<boolean> {
        try {
            const id = await this.db.activities.add(act);
            act.id = id;
            this._activities.push(act);
            // Create the new tags, if any
            const newTags = act.tags.filter(tag => !this.tagsStore.tags.map(tag => tag.name).includes(tag));
            newTags.forEach(tag => this.tagsStore.create(tag));
            return true;
        } catch {
            return false;
        }
    }

    @action
    public async update(act: Activity): Promise<boolean> {
        try {
            const id = await this.db.activities.put(act);
            const index = this._activities.findIndex(a => a.id === id);
            if (index === -1) {
                return false;
            } else {
                this._activities[index] = act;
                return true;
            }
        } catch {
            return false;
        }
    }

    @action
    public async delete(act: Activity): Promise<boolean> {
        try {
            await this.db.activities.delete(act.id!);
            this._activities = without(this._activities, act);
            return true;
        } catch {
            return false;
        }
    }

    //#endregion
}