import Feelings from "./Feelings";

export default class Activity {

    constructor(
        public title: string,
        public description: string,
        public feeling: Feelings,
        public time: string,
        public tags: string[],
        public id?: string
    ){}
}
