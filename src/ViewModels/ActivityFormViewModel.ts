import {action, makeObservable, observable} from 'mobx';
import Activity from '../Models/Activity';
import Feelings from '../Models/Feelings';
import ActivitiesStore from '../Stores/ActivitiesStore';
import FormViewModelBase from './FormViewModelBase';
import '../Utils/ArrayExtensions';

export default class ActivityFormViewModel extends FormViewModelBase {

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
    public tags: Array<string> = [];
    //#endregion

    constructor(
        private store: ActivitiesStore,
        private model?: Activity,
    ) {
        super({
            'title': {
                predicate: (value: string) => !!value && /\S/.test(value),
                message: "Title cannot be empty!"
            }
        });
        if (model !== undefined) {
            this.id = model.id;
            this.title = model.title;
            this.description = model.description;
            this.feeling = model.feeling;
            this.time = model.time;
            this.tags = model.tags;
        }
        makeObservable(this);
    }

    @action
    public addTag(tag: string) {
        this.tags.push(tag);
        this.tags = this.tags.unique();
    }

    public save(): boolean {
        if (this.checkValidity()) {
            if(!this.id) {
                return this.store.create(new Activity(
                    this.title,
                    this.description,
                    this.feeling,
                    this.time,
                    this.tags.slice()
                ));
            } else {
                return this.store.update(new Activity(
                    this.title,
                    this.description,
                    this.feeling,
                    this.time,
                    this.tags.slice(),
                    this.id
                ));
            }
        } else {
            return false;
        }
    }
}