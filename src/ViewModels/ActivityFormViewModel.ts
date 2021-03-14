import {IObservableArray, observable} from 'mobx';
import Activity from '../Models/Activity';
import Feelings from '../Models/Feelings';
import ActivitiesStore from '../Stores/ActivitiesStore';

export default class ActivityFormViewModel {

    //#region properties
    private id?: string;

    @observable
    public title: string;

    @observable
    public description: string;

    @observable
    public feeling: Feelings;

    @observable
    public time: string;

    @observable
    public tags: IObservableArray<string>;
    //#endregion

    constructor(
        private model: Activity,
        private store: ActivitiesStore
    ) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.feeling = model.feeling;
        this.time = model.time;
        this.tags = observable.array(model.tags);
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