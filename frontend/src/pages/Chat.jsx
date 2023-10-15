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
import Alert from '../components/Alert'
import Card from '../components/Card'
import closeIcon from '../assets/close.svg'

const Chat = () => {

    const [urlInput, setUrlInput] = useState('')
    const [messageInput, setMessageInput] = useState('')
    const [phase, setPhase] = useState('enterUrl');
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [loading, setLoading] = useState(true)
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showBuyAlert, setShowBuyAlert] = useState(false)


    useEffect(() => {
        console.log(userData)
    }, [userData])

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
            if (userData.creditsUsed === userData.maxCredits) {
                setShowAlert(true);
                return;
            }
            setPhase('fetchingState');
            const response = await fetch('http://localhost:5000/input-new-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userData._id, video_id: urlInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Create a new user data object with the updated values
            const updatedUserData = {
                ...userData,
                creditsUsed: userData.creditsUsed + 1,
                conversations: [
                    ...userData.conversations,
                    {
                        _id: data.conversation_id,
                        videoId: urlInput,
                        messages: [],
                        summary: data.summary,
                    },
                ],
            };

            // Update the userData using the new object
            setUserData(updatedUserData);
            setPhase('finishedFetching')
        } catch (err) {
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        handleFetchUserData()
    }, [])

    return (
        <>
            <Alert showAlert={showBuyAlert} setShowAlert={setShowBuyAlert}>
                <Card>
                    <img style={{ cursor: 'pointer', width: '16px', position: 'absolute', right: '16px', top: '16px' }} onClick={(e) => setShowBuyAlert(false)} src={closeIcon} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h4>Buy more credits.</h4>
                        <Button handleClick={async () => setShowAlert(false)} text='Click to buy more credits' variant='primary' size='l' />
                    </div>
                </Card>
            </Alert>
            <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
                <Card>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h4>Insufficient funds!</h4>
                        <p>You used up all your credits. Click the blue button to buy more.</p>
                        <div style={{ display: 'flex', gap: '8px', margin: '24px 0 0 auto' }}>
                            <Button handleClick={async () => setShowAlert(false)} text='Cancel' variant='outline' size='l' />
                            <Button handleClick={async () => setShowAlert(false)} text='Click to buy more credits' variant='primary' size='l' />
                        </div>
                    </div>
                </Card>
            </Alert>
            {loading ? <Loading className={`loading ${userData ? 'inactive' : ''}`} /> : <Unauthorized />}
            {userId && userData ?
                <div className="chatPage">
                    <ConversationHistory setShowBuyAlert={setShowBuyAlert} setUserData={setUserData} userData={userData} setPhase={setPhase} />
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