import React, { useEffect, useRef } from 'react';


const OutsideClick = ({ children, onClickOutside, ...props }) => {
    const wrapperRef = useRef (null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onClickOutside();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div {...props} className={`outsideClick ${props.className ? props.className : ''}`} ref={wrapperRef}>
            {children}
        </div>
    )
};

export default OutsideClick;
