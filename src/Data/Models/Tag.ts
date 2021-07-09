export default class Tag {
    constructor(
        public name: string,
        public isSelected: boolean = false,
        public id?: number
    ) {}
}