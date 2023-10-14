import { useEffect, useState } from "react"
import Input from "../components/Input"
import ConversationHistory from "../components/ConversationHistory"
import '../css/Chat.css'
import Button from "../components/Button"
import ChatEnterUrl from "../components/ChatEnterUrl"
import ChatFetchState from "../components/ChatFetchState"
import ChatFinishedFetching from "../components/ChatFinishedFetching"
import Unauthorized from './Unauthorized'
import Loading from './Loading'

const Chat = () => {

    const [urlInput, setUrlInput] = useState('')
    const [messageInput, setMessageInput] = useState('')
    const [phase, setPhase] = useState('enterUrl');
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [loading, setLoading] = useState(true)
    const [selectedConversation, setSelectedConversation] = useState(null)

    const handleFetchUserData = () => {
        fetch('http://localhost:5000/userinfo?user_id=1')
            .then(response => response.json())
            .then(data => setUserData(data.user))
            .catch(err => {
                console.error('Failed to fetch video chat history: ', err)
            })
    }

    const handleSubmitYoutubeUrl = async () => {
        try {
            setPhase('fetchingState');
            const response = await fetch('http://localhost:5000/input-new-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userData._id, video_id: urlInput })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUserData(prev => ({ ...prev,  }))
            setPhase('finishedFetching');
        } catch (err) {
            console.error('Error:', err);
        }
    }

    useEffect(() => {
        handleFetchUserData()
    }, [])

    return (
        <>
            {loading ? <Loading className={`loading ${userData ? 'inactive' : ''}`} /> : <Unauthorized />}
            {userId && userData ?
                <div className="chatPage">
                    <ConversationHistory setUserData={setUserData} userData={userData} setPhase={setPhase} />
                    <div style={{ paddingLeft: '300px' }}>

                        {phase === 'enterUrl' ?
                            <ChatEnterUrl>
                                <Input style={{ width: '100%' }} placeHolder="Enter a youtube URL" search={urlInput} setSearch={setUrlInput} />
                                <Button size="l" handleClick={handleSubmitYoutubeUrl} text='Send' variant='primary' />
                            </ChatEnterUrl>
                            : null}

                        <ChatFetchState phase={phase} setPhase={setPhase} />

                        {phase === 'finishedFetching' ?
                            <ChatFinishedFetching conversationData={userData.conversations[0]}>
                                <Input style={{ width: '100%' }} placeHolder="Send a message" search={messageInput} setSearch={setMessageInput} />
                                <Button size='l' text='Send Message' variant='primary' />
                            </ChatFinishedFetching>
                            : null}
                    </div>
                </div>
                : null}
        </>
    )
}

export default Chat