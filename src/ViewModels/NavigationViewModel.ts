import { autorun, makeObservable, observable, reaction } from "mobx";

export enum SelectModes {
    none,
    selecting,
    deleteAll
}

export default class NavigationViewModel {

    //#region properties
    @observable
    public leftMenuOpen: boolean = false;

    @observable
    public rightMenuOpen: boolean = false;

    @observable
    public selectMode: SelectModes = SelectModes.none;

    @observable
    public hasNext: boolean = true;

    @observable
    public hasPrev: boolean = true;
    //#endregion

    constructor() {
        makeObservable(this);
        autorun(() => {
            if (this.leftMenuOpen) {
                this.rightMenuOpen = false;
            }
            if (this.rightMenuOpen) {
                this.leftMenuOpen = false;
            }
            if (this.selectMode === SelectModes.selecting) {
                this.rightMenuOpen = this.leftMenuOpen = false;
            }
        });
    }

}