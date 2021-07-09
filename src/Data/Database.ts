import Dexie from 'dexie';

import Activity from './Models/Activity';
import Tag from './Models/Tag';

const estimateRecordSize = 400;

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
    
      // In case quota is nearing, clean 5 oldest records
      navigator.storage.estimate()
        .then(estimate => {
          if (!!estimate.quota && !!estimate.usage) {
            if (estimate.quota! - estimateRecordSize * 5 <= estimate.usage!) {
              this.activities.limit(5).toArray()
                .then(arr => 
                  this.activities.bulkDelete(arr.map(act => act.id!))
                );
            }
          }
        });
    }
  }
  
    