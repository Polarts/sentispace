import { makeObservable, observable } from "mobx";

export interface ValidationRule {
    message: string,
    predicate: (value: any) => boolean
};

export default class FormViewModelBase {

    @observable
    public errors: { [fieldName: string]: string } = {};

    constructor(
        protected rules: { [fieldName: string]: ValidationRule }
    ) {
        makeObservable(this);
    }

    protected checkValidity(entries: Array<Array<any>>) : boolean {
        return Object.keys(this.rules).every(field => {
            const valueEntry = entries.find(entry => entry[0] === field);
            if (valueEntry) {
                const value = valueEntry[1];
                const rule = this.rules[field];
                if (rule.predicate(value)) {
                    return true;
                } else {
                    this.errors = { ...this.errors, [field]: rule.message};
                    return false;
                }
            } else {
                return false;
            }
        });
    }
}