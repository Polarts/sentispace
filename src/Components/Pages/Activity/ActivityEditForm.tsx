import React, { useState } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { motion } from 'framer-motion';

import ActivityFormViewModel from '../../../Data/ViewModels/Day/ActivityFormViewModel';
import Feelings from '../../../Data/Models/Feelings';
import { exclude } from '../../../Utils/ArrayHelpers';
import { AnimationDefinition, fade } from '../../../Utils/MotionAnimations';

type ActivityEditFormProps = {
    vm: ActivityFormViewModel,
    isAnimated?: boolean
}

export default observer(
    ({ vm, isAnimated }: ActivityEditFormProps) => {

        const [currentTag, setCurrentTag] = useState('');

        let currAnimation: AnimationDefinition | undefined = fade;
        if (isAnimated === false) {
            currAnimation = undefined;
        }

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

        return (
            <motion.div className="form-body" {...currAnimation}>
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
                    <div className={`time-field${Object.keys(vm.errors).includes('time')? ' validation-error' : ''}`}>
                        <div className="field-label">
                            <span>Time</span>
                            {Object.keys(vm.errors).includes('time')? <span>{vm.errors['time']}</span> : null}
                        </div>
                        <div className="field-content">
                            {/* <button type="button">
                                <span>{moment(vm.time).format("HH:mm")}</span>
                                <div className="time-icon">
                                    <i className="far fa-clock"></i>
                                </div>
                            </button> */}
                            <input type="time" 
                                   value={vm.time?.format("HH:mm") ?? "00:00"} 
                                   onChange={e => vm.time = moment(e.target.value, "HH:mm")}/>
                        </div>
                    </div>
                    <div className="tags-field">
                        <label className="field-label" htmlFor="tag-input">
                            <span>Tags</span>
                        </label>
                        <div className="field-content">
                            {vm.tags.map(tag => 
                                <div className="tag" key={tag}
                                     onClick={() => vm.tags = exclude(vm.tags, tag)}>
                                    <span>{tag}</span>
                                </div>
                            )}
                            <input type="text" name="tag-input" id="tag-input"
                                   value={currentTag} onChange={e => setCurrentTag(e.currentTarget.value)}
                                   onKeyDown={onTagsKeyDown}/>
                        </div>
                    </div>
                </motion.div>
        );
    }
)