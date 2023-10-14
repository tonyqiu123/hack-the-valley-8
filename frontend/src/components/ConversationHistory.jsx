import { useEffect, useState } from "react"
import Button from './Button'
import Popover from './Popover'
import '../css/Chat.css'
import DeleteIcon from '../assets/delete.svg'
import LogoutIcon from '../assets/logout.svg'
import ProfileIcon from '../assets/profile.svg'
import PlusIcon from '../assets/plus.svg'

const ConversationHistory = () => {

    const [ConversationHistoryData, setConversationHistoryData] = useState(null)

    const fetchConversationHistoryData = () => {
        fetch('../../mockConversations.json')
            .then(res => res.json())
            .then(data => {
                setConversationHistoryData(data)
            })
            .catch(error => {
                console.error('Error fetching data: ', error)
            })
    }
    useEffect(() => {
        fetchConversationHistoryData()
    }, [ConversationHistoryData])

    return (
        <div className="conversationHistory">
            <div className="conversationContainer">
                <Button imageSrc={PlusIcon} variant='primary' text='New Chat' size="l" />
                {ConversationHistoryData ? (
                    ConversationHistoryData.map((conversationData, index) => (
                        <div className="conversationItem" key={index}>
                            <p className="conversationText">
                                {conversationData.entry}
                            </p>
                        </div>
                    ))
                ) : null}
            </div>

            <div className="bottomContainer">
                <Popover position="up-right">
                    <div className="popoverItem">
                        <img style={{ height: '24px', width: '24px' }} src={ProfileIcon} />
                        <p>Tony Qiu</p>
                    </div>
                    <div className="popoverMenu">
                        <div className="popoverMenuItem">
                            <img src={DeleteIcon} />
                            <p>Clear conversation history</p>
                        </div>
                        <div className="popoverMenuItem">
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