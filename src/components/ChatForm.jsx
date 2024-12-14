import React, { useRef } from 'react'

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const userMessage = inputRef.current.value.trim()
        if (!userMessage) return
        inputRef.current.value = ''

        setChatHistory(history => [...history, { role: 'user', text: userMessage }])
        
        setTimeout(() => {
            setChatHistory(history => [...history, { role: 'model', text: 'Thinking...' }])
            
            generateBotResponse([...chatHistory, { role: 'user', text: `Using the details provided above, please address this query: ${userMessage}` }])
        }, 600)
    }

    return (
        <form action="#" className="chat_form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder='Message...' className="message_input" required />
            <button>
                <i class="fa-solid fa-chevron-up"></i>
            </button>
        </form>
    )
}

export default ChatForm