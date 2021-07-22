import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { halfFade, inflate } from '../../Utils/MotionAnimations';

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

    const [isVisible, setVisibleState] = useState(isOpen);

    useEffect(() => setVisibleState(isOpen), [isOpen]);

    function hide() {
        setVisibleState(false);
    }

    return (
        <>
            <AnimatePresence initial={false}>
                {isVisible && (
                    <motion.div className="popup-bg" {...halfFade}
                                onClick={() => { if (isLightDismiss) hide(); }}/>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {isVisible && (
                    <motion.div className="popup-wrapper" {...inflate}>
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
                    </motion.div>    
                )}
            </AnimatePresence>
        </>
    );
}
