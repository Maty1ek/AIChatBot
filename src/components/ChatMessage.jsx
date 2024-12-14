import React from 'react'
import ChatbotIcon from './ChatbotIcon'
import DOMPurify from 'dompurify';


const ChatMessage = () => {
    // const sanitizedHTML = DOMPurify.sanitize();

    return (
        <div className={`message user_message `}>
            <p className='message_text'
            // dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            >
                Hola
            </p>
        </div>
    )
}

export default ChatMessage