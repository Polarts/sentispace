import {IObservableArray, makeObservable, observable} from 'mobx';
import Activity from '../Models/Activity';
import Feelings from '../Models/Feelings';
import ActivitiesStore from '../Stores/ActivitiesStore';

export default class ActivityFormViewModel {

    //#region properties
    public id?: string;

    @observable
    public title: string = "";

    @observable
    public description: string = "";

    @observable
    public feeling: Feelings = Feelings.great;

    @observable
    public time: string = "";

    @observable
    public tags: IObservableArray<string> = observable.array([]);
    //#endregion

    constructor(
        private store: ActivitiesStore,
        private model?: Activity,
    ) {
        if (model !== undefined) {
            this.id = model.id;
            this.title = model.title;
            this.description = model.description;
            this.feeling = model.feeling;
            this.time = model.time;
            this.tags = observable.array(model.tags);
        }
        makeObservable(this);
    }

    public save() {
        if(this.id) {
            this.store.create(new Activity(
                this.title,
                this.description,
                this.feeling,
                this.time,
                this.tags.slice()
            ));
        } else {
            this.store.update(new Activity(
                this.title,
                this.description,
                this.feeling,
                this.time,
                this.tags.slice(),
                this.id
            ));
        }
    }
}