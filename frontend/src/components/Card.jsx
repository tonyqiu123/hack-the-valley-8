import React, { HTMLAttributes, useState } from 'react';
import '../css/Card.css'


const Card = ({ darkMode = false, size = 'm', children, ...props }) => {
    return (
        <div {...props} className={` ${props.className ? props.className : ''} card ${darkMode ? 'darkMode' : ''} ${size}`}>
            {children}
        </div>
    )
}

export default Card