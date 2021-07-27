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
        this.errors = {};
        const entries = Object.entries(this);
        Object.keys(this.rules).forEach(fieldName => {
            const valueEntry = entries.find(entry => entry[0] === fieldName);
            if (!!valueEntry) {
                const value = valueEntry[1];
                const rule = this.rules[fieldName];
                if (!rule.predicate(value))
                    this.errors = { ...this.errors, [fieldName]: rule.message};
            }
        });
        return Object.keys(this.errors).length === 0;
    }
}