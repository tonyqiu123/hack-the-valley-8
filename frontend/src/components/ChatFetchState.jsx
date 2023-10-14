import '../css/Chat.css'
import Button from "./Button"
import loadingSpinner from '../assets/loadingSpinner.svg'
import { useEffect } from 'react';

const ChatFetchState = ({ phase, setPhase }) => {
    useEffect(() => {
        // Use a setTimeout to change the phase after 2 seconds
        const timeout = setTimeout(() => {
            setPhase('finishedFetching');
        }, 2000);

        // Clean up the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [setPhase]);

    return (
        <div className={`chatPageBody fetchingState ${phase === 'fetchingState' ? 'active' : 'inactive'}`}>
            <img style={{ height: '32px' }} src={loadingSpinner} alt="Loading Spinner" />
            <p>Fetching video...</p>
        </div>
    );
};

export default ChatFetchState;