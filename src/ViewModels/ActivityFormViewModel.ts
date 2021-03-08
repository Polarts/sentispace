import {observable} from 'mobx';
import Activity from '../Models/Activity';
import ActivitiesStore from '../Stores/ActivitiesStore';

export default class ActivityFormViewModel {

    constructor(
        public model: Activity,
        public store: ActivitiesStore
    ) {}

}