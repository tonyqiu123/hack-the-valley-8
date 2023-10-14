import { useEffect, useState } from "react"
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

const ConversationHistory = ({ setPhase, userData }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

    return (
        <div className="conversationHistory">
            <div className="conversationContainer">
                <Button handleClick={async () => setPhase('enterUrl')} imageSrc={PlusIcon} variant='primary' text='New Chat' size="l" />
                {userData ? (
                    userData.conversations.map((conversationData, index) => (
                        <div className="conversationItem" key={index}>
                            <p className="conversationText">
                                {conversationData.messages[0].message}
                            </p>
                        </div>
                    ))
                ) : null}
            </div>

            <div className="bottomContainer">
                <ProgressBar completed={80} />
                <Popover position="up-right">
                    <div className="popoverItem">
                        <img style={{ height: '24px', width: '24px' }} src={ProfileIcon} />
                        <p>{userData.name}</p>
                    </div>
                    <div className="popoverMenu">
                        <div className="popoverMenuItem">
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