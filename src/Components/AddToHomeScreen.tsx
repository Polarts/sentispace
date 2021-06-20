import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAddToHomescreenPrompt } from '../Hooks/useAddToHomescreenPrompt';

export default function AddToHomeScreen() {

    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [isVisible, setVisibleState] = useState(false);

    useEffect(() => {
        if (prompt) {
            setTimeout(() => 
                setVisibleState(true),
            500);
        }
    }, [prompt]);

    return (
        <>
            <CSSTransition classNames="popup-fade" 
                               in={isVisible}
                               timeout={300}
                               unmountOnExit>
                <div className="popup-bg"></div>
            </CSSTransition>
            <CSSTransition classNames="inflate" 
                            in={isVisible}
                            timeout={300}
                            unmountOnExit>
                <div className="popup-wrapper">
                    <div className="popup-content">
                        <div className="popup-title">
                            INSTALL ME
                            <button className="popup-close-button"
                                    onClick={() => setVisibleState(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="popup-body">
                            <div className="popup-text">
                                I work best from your device! Please add me to your home screen 😁
                            </div>
                            <button className="popup-button primary"
                                    onClick={promptToInstall}>
                                Add to Home Screen
                            </button>
                            <button className="popup-button secondary"
                                    onClick={() => setVisibleState(false)}>
                                I'll pass ☹
                            </button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}