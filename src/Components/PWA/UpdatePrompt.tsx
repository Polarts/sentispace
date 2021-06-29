import React from 'react'
import Popup, { ButtonType } from '../Generic/Popup'

function UpdatePrompt() {

    function restart() {
        window.location.reload();
    }

    return (
        <Popup title="UPDATE AVAILABLE"
               content={
                   <>
                   You should always keep your app up-to-date to avoid bugs and inconveniences.
                   <br></br>
                   All it takes is to restart the app. Don't worry, it won't be long!
                   </>
               }
               buttons={[
                   {
                       type: ButtonType.primary,
                       content: <>Update Now</>,
                       onClick: restart
                   },
                   {
                    type: ButtonType.secondary,
                    content: <>Update Next Time</>,
                    onClick: () => {}
                }
               ]}
               isOpen/>
    )
}

export default UpdatePrompt
