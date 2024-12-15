import React from 'react'
import ChatbotIcon from './ChatbotIcon'
import DOMPurify from 'dompurify';


const ChatMessage = ({message}) => {
    const sanitizedHTML = DOMPurify.sanitize(message.text);

    return (
        <div className={`message ${message.role}_message `}>
            {message.role === 'model' && <ChatbotIcon />}
            <p className='message_text' dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
            </p>
        </div>
    )
}

export default ChatMessage