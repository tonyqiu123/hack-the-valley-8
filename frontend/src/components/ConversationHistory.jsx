import Button from './Button'
import Popover from './Popover'
import '../css/Chat.css'
import DeleteIcon from '../assets/delete.svg'
import LogoutIcon from '../assets/logout.svg'
import ProfileIcon from '../assets/profile.svg'
import PlusIcon from '../assets/plus.svg'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom"
import '../css/ProgressBar.css'
import { useEffect } from 'react'

const ConversationHistory = ({ setPhase, userData, setUserData }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

    const handleClearConversations = () => {
        fetch('http://localhost:5000/clear', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userData._id })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error('Error clearing conversations')
                }
            })
            .then(data => setUserData(prev => ({ ...prev, conversations: [] })))
            .catch(error => {
                console.error("Error: ", error)
            })
    }

    return (
        <div className="conversationHistory">
            <div className="conversationContainer">
                <Button handleClick={async () => setPhase('enterUrl')} imageSrc={PlusIcon} variant='primary' text='New Chat' size="l" />
                {userData ? (
                    userData.conversations
                        .slice() // Create a shallow copy of the array to avoid modifying the original
                        .reverse() // Reverse the copy
                        .map((conversationData, index) => (
                            <div className="conversationItem" key={index}>
                                <p className="conversationText">
                                    {conversationData.summary}
                                </p>
                            </div>
                        ))
                ) : null}

            </div>

            <div className="bottomContainer">
                <p>{userData.creditsUsed} out of {userData.maxCredits} credits used</p>
                <ProgressBar bgColor='#1b83dd' completed={`${userData.creditsUsed}`} maxCompleted={userData.maxCredits} />
                <Popover position="up-right">
                    <div className="popoverItem">
                        <img style={{ height: '24px', width: '24px' }} src={ProfileIcon} />
                        <p>{userData.name}</p>
                    </div>
                    <div className="popoverMenu">
                        <div className="popoverMenuItem">
                            <img src={DeleteIcon} />
                            <p>Buy more credits</p>
                        </div>
                        <div onClick={(e) => handleClearConversations()} className="popoverMenuItem">
                            <img src={DeleteIcon} />
                            <p>Clear conversation history</p>
                        </div>
                        <div onClick={(e) => handleLogout()} className="popoverMenuItem">
                            <img src={LogoutIcon} />
                            <p>Log out</p>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default ConversationHistory