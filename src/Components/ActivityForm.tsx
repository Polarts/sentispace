import React from 'react';
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

        const store = useActivitiesStore();

        function onFeelingSelected(e: React.ChangeEvent<HTMLInputElement>) {
            vm.feeling = e.currentTarget.value as Feelings;
        }
        
        function onSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            e.stopPropagation();
            vm.save();
            store.currentlyEditing = undefined;
        }

        function onCancel() {
            store.currentlyEditing = undefined;
        }

        return (
            <form className="activity-form" onSubmit={onSubmit}>
                <div className="header">
                    {vm.id? "EDIT ACTIVITY" : "NEW ACTIVITY"}
                </div>
                <div className="form-body">
                    <div className="text-field">
                        <label className="field-label" htmlFor="title">
                            <span>Title</span>
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
                            <input type="radio" name="feelings" id="feeling-great" 
                                   value="great" onChange={onFeelingSelected}/>
                            <label htmlFor="feeling-great" className="feeling-mood" data-mood="great">
                                <span>GREAT</span>
                            </label>
                            <input type="radio" name="feelings" id="feeling-good" 
                                   value="good" onChange={onFeelingSelected}/>
                            <label htmlFor="feeling-good" className="feeling-mood" data-mood="good">
                                <span>GOOD</span>
                            </label>
                            <input type="radio" name="feelings" id="feeling-ok" 
                                   value="ok" onChange={onFeelingSelected}/>
                            <label htmlFor="feeling-ok" className="feeling-mood" data-mood="ok">
                                <span>OK</span>
                            </label>
                            <input type="radio" name="feelings" id="feeling-bad" 
                                   value="bad" onChange={onFeelingSelected}/>
                            <label htmlFor="feeling-bad" className="feeling-mood" data-mood="bad">
                                <span>BAD</span>
                            </label>
                            <input type="radio" name="feelings" id="feeling-worst" 
                                   value="worst" onChange={onFeelingSelected}/>
                            <label htmlFor="feeling-worst" className="feeling-mood" data-mood="worst">
                                <span>WORST</span>
                            </label>
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
                            <input type="text" name="tag-input" id="tag-input"/>
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
                                onClick={e => {}}
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