import React from 'react'
import ChatbotIcon from './ChatbotIcon'
import DOMPurify from 'dompurify';


const ChatMessage = ({message}) => {
    const sanitizedHTML = DOMPurify.sanitize(message.text);

    return !message.isHidden && (
        <div className={`message ${message.role}_message ${message.isError && 'error'}`}>
            {message.role === 'model' && <ChatbotIcon />}
            <p className='message_text' dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
            </p>
        </div>
    )
}

export default ChatMessage