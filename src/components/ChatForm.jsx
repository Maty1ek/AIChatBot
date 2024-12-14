import React, { useRef } from 'react'

const ChatForm = () => {

    return (
        <form action="#" className="chat_form" >
            <input type="text" placeholder='Message...' className="message_input" required />
            <button>
                <i class="fa-solid fa-chevron-up"></i>
            </button>
        </form>
    )
}

export default ChatForm