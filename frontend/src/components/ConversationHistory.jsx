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
import cashIcon from '../assets/cash.svg'
import { Toaster, toast } from 'sonner'
import tripleDotsIcon from '../assets/tripleDots.svg'

const ConversationHistory = ({ selectedConversationId, setSelectedConversationId, setPhase, userData, setUserData, setShowBuyAlert }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

    const handleClearConversations = () => {
        fetch('https://hack-the-valley-8-production.up.railway.app/clear', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userData._id })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Error clearing conversations');
                }
            })
            .then(data => {
                setSelectedConversationId(null)
                setPhase('enterUrl')
                setUserData(prev => ({ ...prev, conversations: [] }));
                toast.success('Successfully cleared conversations');
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    return (
        <>
            <Toaster richColors />
            <div className="conversationHistory">
                <div className="conversationContainer">
                    <Button handleClick={async () => { setPhase('enterUrl'); setSelectedConversationId(null) }} imageSrc={PlusIcon} variant='primary' text='New Chat' size="l" />
                    <p style={{ color: 'grey', fontSize:'13px', margin:'16px 0 -12px 0' }}>Conversations</p>
                    {userData ? (
                        userData.conversations
                            .slice() // Create a shallow copy of the array to avoid modifying the original
                            .reverse() // Reverse the copy
                            .map((conversationData, index) => (
                                <div className={`conversationItem ${selectedConversationId === conversationData._id ? 'active' : ''}`} onClick={(e) => setSelectedConversationId(conversationData._id)} key={index}>
                                    <p className="conversationText">
                                        {conversationData.summary}
                                    </p>
                                </div>
                            ))
                    ) : null}

                </div>

                <div className="bottomContainer">
                    <Popover position="up-right">
                        <div className="popoverItem">
                            <img style={{ height: '24px', width: '24px' }} src={ProfileIcon} />
                            <p>{userData.name}</p>
                            <img style={{ filter: 'brightness(80%)', height: '16px', marginLeft: 'auto' }} src={tripleDotsIcon} />
                        </div>
                        <div className="popoverMenu">
                            <div onClick={(e) => setShowBuyAlert(true)} className="popoverMenuItem">
                                <img src={cashIcon} />
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
                    <p>{userData.creditsUsed} out of {userData.maxCredits} credits used</p>
                    <ProgressBar height='22px' labelClassName='progressBarLabel' bgColor='#1b83dd' completed={`${userData.creditsUsed}`} maxCompleted={userData.maxCredits} />
                </div>
            </div>
        </>
    );
}

export default ConversationHistory