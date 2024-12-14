import React from 'react'
import ChatbotIcon from './ChatbotIcon'
import DOMPurify from 'dompurify';


const ChatMessage = ({message}) => {
    console.log(message);
    
    const sanitizedHTML = DOMPurify.sanitize(message.text);

    return (
        <div className={`message ${message.role}_message `}>
            <p className='message_text' dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
            </p>
        </div>
    )
}

export default ChatMessage