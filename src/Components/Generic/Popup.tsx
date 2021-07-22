import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

export enum ButtonType {
    primary='primary',
    secondary='secondary'
}

export interface PopupButton {
    type: ButtonType
    content: JSX.Element,
    onClick: () => void
}

type PopupProps = {
    title: string,
    content: JSX.Element,
    buttons: PopupButton[],
    isOpen?: boolean,
    isLightDismiss?: boolean
}

export default function Popup({ 
    title, 
    content, 
    buttons,
    isOpen = false, 
    isLightDismiss = false
}: PopupProps) {

    const bgRef = useRef(null);
    const popupRef  = useRef(null);
    const [isVisible, setVisibleState] = useState(isOpen);

    useEffect(() => setVisibleState(isOpen), [isOpen]);

    function hide() {
        setVisibleState(false);
    }

    return (
        <>
            <CSSTransition classNames="popup-fade" 
                           nodeRef={bgRef}
                           in={isVisible}
                           timeout={300}
                           unmountOnExit>
                <div className="popup-bg" 
                     ref={bgRef}
                     onClick={() => { if (isLightDismiss) hide(); }}/>
            </CSSTransition>
            <CSSTransition classNames="inflate" 
                           nodeRef={popupRef}
                           in={isVisible}
                           timeout={300}
                           unmountOnExit>
                <div className="popup-wrapper" ref={popupRef}>
                    <div className="popup-content">
                        <div className="popup-title">
                            {title}
                            <button className="popup-close-button"
                                    onClick={hide}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="popup-body">
                            <div className="popup-text">
                                {content}
                            </div>
                            {buttons.map((b, i) => (
                                <button key={`popup-button-${i}`} 
                                        className={`popup-button ${b.type}`}
                                        onClick={() => { b.onClick(); hide(); }}>
                                    {b.content}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}
