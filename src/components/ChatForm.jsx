import React, { useRef } from 'react'

const ChatForm = ({chatHistory, setChatHistory, getBotResponse}) => {
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!inputRef.current.value) return

        setChatHistory(prev => [...prev, {role: 'user', text: inputRef.current.value}])

        setTimeout(() => {
            setChatHistory(prev => [...prev, {role: 'model', text: 'Thinking...'}])
            
            getBotResponse([chatHistory, {role: 'user', text: inputRef.current.value}])
        }, 600)
        inputRef.current.value = ''
    }

    return (
        <form action="#" className="chat_form" onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" placeholder='Message...' className="message_input" required />
            <button>
                <i class="fa-solid fa-chevron-up"></i>
            </button>
        </form>
    )
}

export default ChatForm