import React, { useRef } from 'react'

const ChatForm = ({chatHistory, setChatHistory, getBotResponse}) => {
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const userMsg = inputRef.current.value

        if(!userMsg) return

        setChatHistory(prev => [...prev, {role: 'user', text: userMsg}])

        setTimeout(() => {
            setChatHistory(prev => [...prev, {role: 'model', text: 'Thinking...'}])
            
            getBotResponse([...chatHistory, {role: 'user', text: `based on the description on the top, respond to this message:${userMsg}`}])
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