import React, { HTMLAttributes, useEffect, useState } from 'react';
import '../css/Alert.css'
import Backdrop from './Backdrop';

const Alert = ({ children, setShowAlert, showAlert, darkMode = false, ...props }) => {

    return (
        <React.Fragment >
            <div {...props} className={`${props.className ? props.className : ''} ${darkMode && 'darkMode'} alert ${showAlert ? 'showAlert' : ''}`}>
                {children}
            </div>
            <Backdrop darkMode={darkMode} showBackdrop={showAlert} setShowBackdrop={() => {}} />
        </React.Fragment>
    );
};

export default Alert;
