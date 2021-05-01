import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useActivitiesStore } from '../Stores/ActivitiesStore';
import ActivityFormViewModel from '../ViewModels/ActivityFormViewModel';
import Feelings from '../Models/Feelings';
import moment from 'moment';

type ActivitiesFormProps = {
    vm: ActivityFormViewModel
}

export default observer(
    ({vm}: ActivitiesFormProps) => {

        const [currentTag, setCurrentTag] = useState('');
        const store = useActivitiesStore();

        function onFeelingSelected(e: React.ChangeEvent<HTMLInputElement>) {
            vm.feeling = e.currentTarget.value as Feelings;
        }

        function onTagsKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                if (!!currentTag && /\S/.test(currentTag)) {
                    vm.addTag(currentTag);
                    setCurrentTag('');
                }
            }
        }
        
        function onSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            if (vm.save()) 
                onCancel();
        }

        function onCancel() {
            store.currentlyEditing = undefined;
            store.selectedActivities = [];
        }

        return (
            <form className="activity-form" onSubmit={onSubmit}>
                <div className="header">
                    {vm.id? "EDIT ACTIVITY" : "NEW ACTIVITY"}
                </div>
                <div className="form-body">
                    <div className={`text-field${Object.keys(vm.errors).includes('title')? ' validation-error' : ''}`}>
                        <label className="field-label" htmlFor="title">
                            <span>Title</span>
                            {Object.keys(vm.errors).includes('title')? <span>{vm.errors['title']}</span> : null}
                        </label>
                        <input type="text" name="title" id="title" className="field-content" 
                               value={vm.title}
                               onChange={e => vm.title = e.currentTarget.value}/>
                    </div>
                    <div className="text-field">
                        <label className="field-label" htmlFor="description">
                            <span>Description</span>
                        </label>
                        <textarea name="description" id="description" rows={10} className="field-content" 
                                  value={vm.description}
                                  onChange={e => vm.description = e.currentTarget.value}/>
                    </div>
                    <div className="feelings-field">
                        <label className="field-label" htmlFor="feelings">
                            <span>Feeling</span>
                        </label>
                        <div className="field-content">
                            {Object.values(Feelings).map(mood => (
                                <React.Fragment key={mood}>
                                    <input type="radio" name="feelings" id={`feeling-${mood}`} 
                                           value={mood} onChange={onFeelingSelected}
                                           checked={vm.feeling === mood}/>
                                    <label htmlFor={`feeling-${mood}`} className="feeling-mood" data-mood={mood}>
                                        <span>{mood.toUpperCase()}</span>
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="time-field">
                        <div className="field-label">
                            <span>Time</span>
                        </div>
                        <div className="field-content">
                            <button type="button">
                                <span>{moment(vm.time).format("HH:mm")}</span>
                                <div className="time-icon">
                                    <i className="far fa-clock"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="tags-field">
                        <label className="field-label" htmlFor="tag-input">
                            <span>Tags</span>
                        </label>
                        <div className="field-content">
                            {vm.tags.map(tag => 
                                <div className="tag" key={tag}
                                     onClick={() => vm.tags.remove(tag)}>
                                    <span>{tag}</span>
                                </div>
                            )}
                            <input type="text" name="tag-input" id="tag-input"
                                   value={currentTag} onChange={e => setCurrentTag(e.currentTarget.value)}
                                   onKeyDown={onTagsKeyDown}/>
                        </div>
                    </div>
                </div>
                <div className="nav-footer">
                    <div className="content">
                        <button className="fab button-secondary"
                                type="reset"
                                onClick={onCancel}>
                            <i className="fas fa-times"></i>
                        </button>
                        <button className="fab button-secondary"
                                type ="submit">
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                    <div className="bottom-filler"/>
                </div>
            </form>
            
        );
    }
);