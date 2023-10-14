import React, { useState } from 'react';
import '../css/Button.css';
import LoadingSpinner from '../assets/loadingSpinner.svg'


const Button = ({
    text,
    variant,
    size = 'm',
    imageSrc,
    darkMode = false,
    isDisabled = false,
    handleClick,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        if (!isDisabled && !isLoading && handleClick) {
            setIsLoading(true);
            try {
                await handleClick();
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
    };

    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            {...props}
            className={`button ${darkMode ? 'darkMode' : ''} ${props.className ? props.className : ''} ${size} ${variant} ${isLoading ? 'loading' : ''
                }`}
        >
            <React.Fragment>
                <p style={{  }}>{text}</p>
                {imageSrc && <img style={{ filter: `${darkMode ? 'invert(1)' : 'invert(0)'}` }} src={imageSrc} alt='' height={14} width={14} />}
            </React.Fragment>
            <img className='loading' src={LoadingSpinner} alt="Loading" width={14} height={14} />
        </button>
    );
};

export default Button;
