import React from 'react';
import { observer } from 'mobx-react';
import MessagingService, { Message } from '../Services/MessagingService';

export default observer(
    () => {

        function onPlusClicked() {
            MessagingService.instance.send(Message.actDeselectAll);
        }

        return (
            <footer className="nav-footer">
                <nav>
                    <button className="fab button-secondary">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="fab button-primary" onClick={onPlusClicked}>
                        <i className="fas fa-plus"></i>
                    </button>
                    <button className="fab button-secondary">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
                <div className="bottom-filler"></div>
            </footer>
        );
    }
);