import FeelingsEnum from "./FeelingsEnum";

export default class Activity {

    constructor(
        public title: string,
        public description: string,
        public feeling: FeelingsEnum,
        public time: string,
        public tags: string[],
        public id?: string
    ){}

        
}
