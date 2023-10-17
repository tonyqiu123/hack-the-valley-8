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
import ProgressBar from "@ramonak/react-progress-bar"

const Chat = () => {

    const [urlInput, setUrlInput] = useState('')
    const [phase, setPhase] = useState('enterUrl');
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [loading, setLoading] = useState(true)
    const [selectedConversationId, setSelectedConversationId] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showBuyAlert, setShowBuyAlert] = useState(false)

    const handleFetchUserData = () => {
        fetch('https://hack-the-valley-8-production.up.railway.app/userinfo?user_id=1')
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
            const response = await fetch('https://hack-the-valley-8-production.up.railway.app/input-new-video', {
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
            setSelectedConversationId(data.conversation_id)
            setPhase('finishedFetching')
        } catch (err) {
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        handleFetchUserData()
    }, [])

    useEffect(() => {
        if (selectedConversationId !== null) {
            setPhase('finishedFetching')
        }
    }, [selectedConversationId])

    return (
        <>
            {userData &&
                <>
                    <Alert showAlert={showBuyAlert} setShowAlert={setShowBuyAlert}>
                        <Card style={{ alignItems: 'center', gap: '40px', padding: '40px', minWidth: '500px' }}>
                            <img style={{ cursor: 'pointer', width: '16px', position: 'absolute', right: '16px', top: '16px' }} onClick={(e) => setShowBuyAlert(false)} src={closeIcon} />
                            <h1>Buy more credits.</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p>{userData.creditsUsed} out of {userData.maxCredits} credits used</p>
                                {userData &&  <ProgressBar height='22px' labelClassName='progressBarLabel' bgColor='#1b83dd' completed={`${userData.creditsUsed}`} maxCompleted={userData.maxCredits} />}
                            </div>
                            <Button handleClick={async () => setShowAlert(false)} text='Buy more credits' variant='primary' size='l' />
                            <h2>$1 = 1 credit</h2>
                        </Card>
                    </Alert>
                    <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
                        <Card>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <h3>Insufficient credits!</h3>
                                <p>You used up all your credits. Click the blue button to buy more.</p>
                                <div style={{ display: 'flex', gap: '8px', margin: '24px 0 0 auto' }}>
                                    <Button handleClick={async () => setShowAlert(false)} text='Cancel' variant='outline' size='l' />
                                    <Button handleClick={async () => { setShowAlert(false); setShowBuyAlert(true)}} text='Click to buy more credits' variant='primary' size='l' />
                                </div>
                            </div>
                        </Card>
                    </Alert>
                </>
            }
            {loading ? <Loading className={`loadingPage ${userData ? 'inactive' : ''}`} /> : <Unauthorized />}
            {userId && userData ?
                <div className="chatPage">
                    <ConversationHistory selectedConversationId={selectedConversationId} setSelectedConversationId={setSelectedConversationId} setShowBuyAlert={setShowBuyAlert} setUserData={setUserData} userData={userData} setPhase={setPhase} />
                    <div style={{ paddingLeft: '300px' }}>

                        {phase === 'enterUrl' ?
                            <ChatEnterUrl>
                                <Input style={{ width: '100%' }} placeHolder="Enter a youtube URL" search={urlInput} setSearch={setUrlInput} />
                                <Button size="l" handleClick={handleSubmitYoutubeUrl} text='Send' variant='primary' />
                            </ChatEnterUrl>
                            : null}

                        <ChatFetchState phase={phase} setPhase={setPhase} />

                        {phase === 'finishedFetching' ?
                            <ChatFinishedFetching userData={userData} setUserData={setUserData} selectedConversationId={selectedConversationId} />
                            : null}
                    </div>
                </div>
                : null}
        </>
    )
}

export default Chat