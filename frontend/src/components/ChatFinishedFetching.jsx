import React, { useEffect, useRef } from 'react';
import '../css/Chat.css';
import Button from './Button';
import SplitView from './SplitView';

const ChatFinishedFetching = ({ children, conversationData }) => {
    const messageBodyRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the messageBody element on render
        if (messageBodyRef.current) {
            messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
        }
    }, [conversationData]);

    return (
        <div className='finishedFetching'>
            <SplitView
                left={
                    <div className='chatFinished-left'>
                        <img
                            className='chatVideo'
                            src="https://cdn.discordapp.com/attachments/715319623637270638/1162597796239659038/image_12.png?ex=653c8492&is=652a0f92&hm=0bc2d948dfbc3a4db177268a9db633ab5b4ef64b39b5a1632509a08a7551370a&"
                        />
                    </div>
                }
                right={
                    <div className='chatFinished-right'>
                        <div ref={messageBodyRef} className='chatFinished-right-messageBody'>
                            {conversationData.messages.map((message, index) => (
                                <div key={index} className='chatFinished-right-message'>
                                    <img
                                        style={{ width: '32px' }}
                                        src={
                                            message.speaker === 'bot'
                                                ? 'https://cdn.discordapp.com/attachments/715319623637270638/1162640352277180426/image.png?ex=653cac34&is=652a3734&hm=3969200ba9f5342d039e2e51ffe3c940b03892efca3d11e7327007724e9c6866&'
                                                : 'https://cdn.discordapp.com/attachments/715319623637270638/1162640579222569030/image.png?ex=653cac6a&is=652a376a&hm=02f7b5456ac88219f9fcf8c042f2c485e2a15187b77f21dcd21b355d9868898f&'
                                        }
                                    />
                                    <p style={{ transform: 'translateY(5px)' }} key={index}>
                                        {message.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='chatFinished-right-inputField'>{children}</div>
                    </div>
                }
            />
        </div>
    );
};

export default ChatFinishedFetching;
