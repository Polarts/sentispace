import Dexie from 'dexie';
import Activity from './Models/Activity';
import Tag from './Models/Tag';

export default class Database extends Dexie {
    activities: Dexie.Table<Activity, number>;
    tags: Dexie.Table<Tag, number>;
    
    constructor() {  
      super("ActivitiesDatabase");

      this.version(1).stores({
        activities: '++id, title, description, feeling, time, tags',
        tags: '++id, name, isSelected'
      });
      
      this.activities = this.table("activities");
      this.tags = this.table("tags");
    }
  }