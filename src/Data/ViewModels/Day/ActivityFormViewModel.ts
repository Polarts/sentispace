import {
    makeObservable, 
    observable,
    action, 
} from 'mobx';

import Activity from '../../Models/Activity';
import Feelings from '../../Models/Feelings';
import ActivitiesStore from '../../Stores/ActivitiesStore';
import FormViewModelBase from '../FormViewModelBase';
import { unique } from '../../../Utils/ArrayHelpers';
import moment, { Moment } from 'moment';

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
    public time!: Moment;

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
            },
            'time': {
                predicate: (value: Moment) => value.diff(moment()) < 0,
                message: "cannot be in the future!"
            }
        });
        if (model !== undefined) {
            this.id = model.id;
            this.title = model.title;
            this.description = model.description;
            this.feeling = model.feeling;
            this.time = moment.unix(model.time);
            this.tags = model.tags;
        } else {
            this.time = moment();
        }
        makeObservable(this);
    }

    @action
    public addTag(tag: string) {
        this.tags = unique([...this.tags, tag]);
    }

    public async save(): Promise<boolean> {
        if (this.checkValidity()) {
            if(!this.id) {
                return await this.store.create(new Activity(
                    this.title,
                    this.description,
                    this.feeling,
                    this.time.unix(),
                    this.tags.slice()
                ));
            } else {
                return await this.store.update(new Activity(
                    this.title,
                    this.description,
                    this.feeling,
                    this.time.unix(),
                    this.tags.slice(),
                    this.id
                ));
            }
        } else {
            return false;
        }
    }
}