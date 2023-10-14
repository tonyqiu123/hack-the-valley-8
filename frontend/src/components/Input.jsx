import React from 'react';
import '../css/Input.css';


const Input = ({
    type = 'text', // Default to 'text' if not specified
    search,
    setSearch,
    placeHolder = 'Search',
    darkMode = false,
    fullWidth,
    iconSrc,
    ...props
}) => {
    return (
        <div {...props} className={`inputContainer ${props.className}`}>
            {iconSrc && <img alt='' width={16} height={16} src={iconSrc} />}
            <input
                type={type} // Use the 'type' prop here
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeHolder}
                className={`input ${darkMode ? 'darkMode' : ''} ${iconSrc ? 'inputWithImg' : ''} ${fullWidth ? 'fullWidth' : ''
                    }`}
            />
        </div>
    );
};

export default Input;