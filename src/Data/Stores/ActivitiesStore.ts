import {
    observable, 
    IObservableArray, 
    action, 
    makeObservable, 
} from 'mobx';
import { Moment } from 'moment';
import { exclude } from '../../Utils/ArrayHelpers';
import Database from '../Database';
import Activity from '../Models/Activity';
//import moment from 'moment';
//import Feelings from '../Models/Feelings';
import TagsStore from './TagsStore';

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

    @observable 
    public selectedTags: IObservableArray<string> = observable.array<string>();

    private isInit = false;
    
    private db!: Database;

    private tagsStore!: TagsStore;

    @observable
    public activities: IObservableArray<Activity> = observable.array<Activity>();

    public earliestActivity!: Activity;

    //#endregion

    //#region methods

    private filterActivity(act: Activity): boolean {

        const store = ActivitiesStore.instance;

        return store.selectedTags.length === 0 || 
                act.tags.every(tag => store.selectedTags.includes(tag));
    }

    private sortActivity(a: Activity, b: Activity): number {
        return Math.sign(a.time - b.time);
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
        //         moment().startOf('day').add(rng, 'hours').unix(),
        //         []
        //     ));
        // }
        // db.activities.bulkAdd(acts);

        this.db.activities.limit(1).toArray()
            .then(acts => this.earliestActivity = acts[0]);
        this.isInit = true;
    }

    @action
    public async create(act: Activity): Promise<boolean> {
        try {
            const id = await this.db.activities.add(act);
            act.id = id;
            // Create the new tags, if any
            const newTags = exclude(act.tags, ...this.tagsStore.tagNames);
            this.tagsStore.createMany(newTags);
            return true;
        } catch {
            return false;
        }
    }

    @action
    public async update(act: Activity): Promise<boolean> {
        try {
            const id = await this.db.activities.put(act);
            const index = this.activities.findIndex(a => a.id === id);
            if (index !== -1) {
                this.activities[index] = act;
            }
            return true;
        } catch {
            return false;
        }
    }

    @action
    public async delete(act: Activity): Promise<boolean> {
        try {
            await this.db.activities.delete(act.id!);
            this.activities.remove(act);
            return true;
        } catch {
            return false;
        }
    }

    public async filterByDate(date: Moment) {
        const startOfDay = date.startOf('day');
        const theDayAfter = startOfDay.clone().add(1, 'days');

        const acts = await this.db.activities
            .where('time')
            .between(startOfDay.unix(), theDayAfter.unix())
            .toArray();

        this.activities = observable.array(
            acts.filter(this.filterActivity)
                .sort(this.sortActivity)
        );
    }

    public async filterByDateRange(start: Moment, end: Moment) {
        const acts = await this.db.activities
            .where('time')
            .between(start.unix(), end.unix())
            .toArray();

        this.activities = observable.array(
            acts.filter(this.filterActivity)
                .sort(this.sortActivity)
        );
    }

    //#endregion
}