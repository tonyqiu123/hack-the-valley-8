import { useEffect, useState } from "react"
import Input from "../components/Input"
import ConversationHistory from "../components/ConversationHistory"
import '../css/Chat.css'
import Button from "../components/Button"
import ChatEnterUrl from "../components/ChatEnterUrl"
import ChatFetchState from "../components/ChatFetchState"
import ChatFinishedFetching from "../components/ChatFinishedFetching"
import Unauthorized from './Unauthorized'

const Chat = () => {

    const [urlInput, setUrlInput] = useState('')
    const [messageInput, setMessageInput] = useState('')
    const [phase, setPhase] = useState('enterUrl');
    const [chatVideoHistory, setVideoChatHistory] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const handleFetchChatVideoHistory = () => {
        fetch('../../mockChatHistory.json')
            .then(response => response.json())
            .then(data => setVideoChatHistory(data.documents))
            .catch(err => {
                console.error('Failed to fetch video chat history: ', err)
            })
    }

    useEffect(() => {
        handleFetchChatVideoHistory()
    }, [])

    return (
        <>
            {userId ?
                <div className="chatPage">
                    <ConversationHistory />
                    <div style={{ paddingLeft: '300px' }}>

                        {phase === 'enterUrl' ?
                            <ChatEnterUrl>
                                <Input style={{ width: '100%' }} placeHolder="Enter a youtube URL" search={urlInput} setSearch={setUrlInput} />
                                <Button size="l" handleClick={async () => setPhase('fetchingState')} text='Send' variant='primary' />
                            </ChatEnterUrl>
                            : null}

                        <ChatFetchState phase={phase} setPhase={setPhase} />

                        {phase === 'finishedFetching' ?
                            <ChatFinishedFetching chatVideoHistory={chatVideoHistory}>
                                <Input style={{ width: '100%' }} placeHolder="Send a message" search={messageInput} setSearch={setMessageInput} />
                                <Button size='l' text='Send Message' variant='primary' />
                            </ChatFinishedFetching>
                            : null}
                    </div>
                </div>
                : <Unauthorized />}
        </>
    )
}

export default Chat