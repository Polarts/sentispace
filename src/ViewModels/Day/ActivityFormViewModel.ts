import {action, makeObservable, observable} from 'mobx';
import Activity from '../../Data/Models/Activity';
import Feelings from '../../Data/Models/Feelings';
import ActivitiesStore from '../../Data/ActivitiesStore';
import FormViewModelBase from '../FormViewModelBase';
import '../../Utils/ArrayExtensions';

export default class ActivityFormViewModel extends FormViewModelBase {

    //#region properties
    public id?: number;

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
                message: "must not be empty!"
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

    public async save(): Promise<boolean> {
        if (this.checkValidity()) {
            if(!this.id) {
                return await this.store.create(new Activity(
                    this.title,
                    this.description,
                    this.feeling,
                    this.time,
                    this.tags.slice()
                ));
            } else {
                return await this.store.update(new Activity(
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