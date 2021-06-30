import { 
    makeObservable, 
    observable, 
    computed, 
} from "mobx";
import Tag from "../Models/Tag";


export default class TagsStore {

    //#region singleton

    private static _instance: TagsStore;

    private constructor() {
        makeObservable(this);
    }

    public static get instance(){ 
        return this._instance ?? (this._instance = new TagsStore()); 
    }

    //#endregion

    //#region properties

    @observable
    public tags: Tag[] = [];

    @computed 
    public get selectedTags() {
        return this.tags.filter(tag => tag.isSelected);
    }

    //#endregion

    
}