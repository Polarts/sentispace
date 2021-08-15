import React, { useState } from "react";
import ActivityFormViewModel from "../Data/ViewModels/Day/ActivityFormViewModel";

type FormSubmitHookResult = {
    isWaiting: boolean,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function useFormSubmit(
    vm: ActivityFormViewModel, 
    onCancel?: () => void,
    onSuccess?: () => void, 
): FormSubmitHookResult {
    const [isWaiting, setWaiting] = useState(false);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setWaiting(true);
        vm.save().then(succ => {
            if (succ && !!onCancel) {
                onCancel();
            } else {
                setWaiting(false);
                if (!!onSuccess) {
                    onSuccess();
                }
            }
        })
    }

    return {isWaiting, onSubmit};
}