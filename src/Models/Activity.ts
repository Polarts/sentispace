import FeelingsEnum from "./FeelingsEnum";

export default class Activity {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public feeling: FeelingsEnum,
        public time: Date,
        public tags: string[]
    ){}
}
