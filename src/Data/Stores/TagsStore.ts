import { 
    makeObservable, 
    observable, 
    computed,
    action, 
} from "mobx";
import { without } from "../../Utils/ArrayHelpers";
import Database from "../Database";
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

    private isInit = false;

    private db!: Database;

    //#endregion

    //#region methods

    @action
    public init(db: Database) {
        if (this.isInit) return;
        this.db = db;
        this.db.tags.toArray().then(arr => this.tags = arr);
        this.isInit = true;
    }

    @action
    public async create(name: string): Promise<boolean> {
        try {
            const tag = new Tag(name);
            const id = await this.db.tags.add(tag);
            tag.id = id;
            this.tags.push(tag);
            return true;
        } catch {
            return false;
        }
    }

    @action
    public async update(tag: Tag): Promise<boolean> {
        try {
            const id = await this.db.tags.put(tag);
            const index = this.tags.findIndex(a => a.id === id);
            if (index === -1) {
                return false;
            } else {
                this.tags[index] = tag;
                return true;
            }
        } catch {
            return false;
        }
    }

    @action
    public async delete(tag: Tag): Promise<boolean> {
        try {
            await this.db.tags.delete(tag.id!);
            this.tags = without(this.tags, tag);
            return true;
        } catch {
            return false;
        }
    }

    //#endregion
    
}