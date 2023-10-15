import '../css/Chat.css'
import Button from "./Button"
import loadingSpinner from '../assets/loadingSpinner.svg'
import { useEffect } from 'react';

const ChatFetchState = ({ phase, setPhase }) => {
    
    

    return (
        <div className={`chatPageBody fetchingState ${phase === 'fetchingState' ? 'active' : 'inactive'}`}>
            <img className='loadingPage-spinner' style={{ height: '32px' }} src={loadingSpinner} alt="Loading Spinner" />
            <p>Fetching video...</p>
        </div>
    );
};

export default ChatFetchState;