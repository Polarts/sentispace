import React from 'react';
import { observer } from 'mobx-react-lite';
import ActivityFormViewModel from '../ViewModels/ActivityFormViewModel';

export default observer(
    () => {



        return (
            <form style={{height: '100vh', zIndex: 2, position: 'absolute', top: 0}}>
                <div className="header">
                    EDIT
                    {/* {vm.id? "EDIT ACTIVITY" : "NEW ACTIVITY"} */}
                </div>
                <div style={{background: 'white', height: '100vh'}}>

                </div>
                <div className="nav-footer">
                    <div className="content">
                        <button className="fab button-secondary"
                                type="reset"
                                style={{backgroundColor: 'tomato'}}>
                            <i className="fas fa-times"></i>
                        </button>
                        <button className="fab button-secondary"
                                type ="submit"
                                style={{backgroundColor: 'greenyellow'}}>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                    <div className="bottom-filler"/>
                </div>
            </form>
        );
    }
);