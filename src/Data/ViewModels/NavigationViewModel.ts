import { 
    makeObservable, 
    observable, 
    reaction 
} from "mobx";

export enum DisplayModes {
    none,
    selecting,
    deleteAll,
    creating
}

export default class NavigationViewModel {

    //#region properties

    @observable
    public leftMenuOpen: boolean = false;

    @observable
    public rightMenuOpen: boolean = false;

    @observable
    public displayMode: DisplayModes = DisplayModes.none;

    @observable
    public headerContent: string[] = [];

    @observable
    public nextCallback?: () => void;

    @observable
    public prevCallback?: () => void;

    @observable
    public hasNext: boolean = false;

    @observable 
    public hasPrev: boolean = true;

    //#endregion

    constructor() {
        makeObservable(this);
        reaction(
            () => this.displayMode,
            () => {
                if (this.displayMode === DisplayModes.selecting) {
                    this.rightMenuOpen = this.leftMenuOpen = false;
                }
            }
        );
    }

}