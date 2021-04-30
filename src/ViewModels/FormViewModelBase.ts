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

    /**
     * Checks validity of the class' properties according to the rules, 
     * and raises errors into the errors dictionary.
     * @returns true if all validation rule predicates have passed.
     */
    protected checkValidity(): boolean {
        const entries = Object.entries(this);
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