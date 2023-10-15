import React, { useEffect, useRef, useState } from 'react';
import '../css/Chat.css';
import SplitView from './SplitView';
import Input from './Input';
import Button from './Button';

const ChatFinishedFetching = ({ setUserData, userData, selectedConversationId }) => {
    const messageBodyRef = useRef(null);

    const [messageInput, setMessageInput] = useState('')
    const [videoId, setVideoId] = useState(null)

    useEffect(() => {
        // Scroll to the bottom of the messageBody element on render
        if (messageBodyRef.current) {
            messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
        }
    }, [selectedConversationId, userData]);

    useEffect(() => {
        console.log(userData.conversations.filter(_ => _._id === selectedConversationId)[0].videoId.split("v=")[1])
        if (userData) {
            setVideoId(userData.conversations.filter(_ => _._id === selectedConversationId)[0].videoId.split("v=")[1])
        }
    }, [selectedConversationId])

    const handleSendMessage = async () => {
        const data = {
            user_id: userData._id,
            conversation_id: selectedConversationId,
            message: messageInput
        };

        try {
            const response = await fetch('http://localhost:5000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                const responseData = await response.json();
                const serializedData = responseData.dialogue;
                // Update the userData state
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    conversations: prevUserData.conversations.map((conversation) => {
                        if (conversation._id === selectedConversationId) {
                            // Clone the conversation and push the new message
                            const updatedConversation = { ...conversation };
                            updatedConversation.messages.push({ ...serializedData[0] });
                            updatedConversation.messages.push({ ...serializedData[1] });
                            return updatedConversation;
                        } else {
                            return conversation;
                        }
                    })
                }));
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='finishedFetching'>
            <SplitView
                left={
                    <div className='chatFinished-left'>
                        <iframe width='100%' height='100%' style={{ border: 'none', borderRadius: '24px' }} src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen></iframe>
                    </div>
                }
                right={
                    <div className='chatFinished-right'>
                        <div ref={messageBodyRef} className='chatFinished-right-messageBody'>
                            {userData && userData.conversations.filter(conversation => conversation._id === selectedConversationId)[0].messages.map((message, index) => (
                                <div key={index} className='chatFinished-right-message'>
                                    <img
                                        style={{ width: '32px' }}
                                        src={
                                            message.speaker === 'bot'
                                                ? 'https://cdn.discordapp.com/attachments/715319623637270638/1163112688315023379/image_14_1.png?ex=653e641a&is=652bef1a&hm=df8a6aa60d9bacdd97d66c44a4f17545acd9b7e87b044e8f0daf2c2b94d32d36&'
                                                : 'https://cdn.discordapp.com/attachments/715319623637270638/1162640579222569030/image.png?ex=653cac6a&is=652a376a&hm=02f7b5456ac88219f9fcf8c042f2c485e2a15187b77f21dcd21b355d9868898f&'
                                        }
                                    />
                                    <p style={{ marginTop: '5px' }} key={index}>
                                        {message.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='chatFinished-right-inputField'>
                            <Input style={{ width: '100%' }} placeHolder="Ask about the video" search={messageInput} setSearch={setMessageInput} />
                            <Button handleClick={handleSendMessage} size='l' text='Send message' variant='primary' />
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default ChatFinishedFetching;
