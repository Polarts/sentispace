import React, { useEffect, useState } from 'react';
import { useAddToHomescreenPrompt } from '../../Hooks/useAddToHomescreenPrompt';
import Popup, { ButtonType } from '../Generic/Popup';

export default function AddToHomeScreen() {

    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [isOpen, setOpenState] = useState(false);

    useEffect(() => {
        if (prompt) {
            setTimeout(() => 
                setOpenState(true),
            500);
        }
    }, [prompt]);

    return (
        <Popup title="INSTALL ME"
               content={
                   <>
                   I work best on YOUR device! Install me for a smoother experience 😁
                   <br></br>
                   (Just one click, no Play Store)
                   </>
               }
               buttons={[
                   {
                       type: ButtonType.primary,
                       content: <>Install App</>,
                       onClick: promptToInstall
                   },
                   {
                       type: ButtonType.secondary,
                       content: <>I'll pass ☹</>,
                       onClick: () => {}
                   }
               ]}
               isOpen={isOpen}/>
    );
}