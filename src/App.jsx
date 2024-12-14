import { useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon.jsx'
import ChatForm from './components/ChatForm.jsx'
import ChatMessage from './components/ChatMessage.jsx'

function App() {
  const [chatHistory, setChatHistory] = useState([])

  const getBotResponse = async (history) => {
    history = history.map((msg) => ({role: msg.role, "parts": [{text: msg.text}]}))

    requestParams = {
      method: 'POST',
      'Content-Type': 'application/json',
      contents: history
    }

    // try {
    //   const APIResponse = fetch(import.meta.process.env.VITE_API_URL)
      
    // } catch (error) {
    // }
  }

  return (
    <div className="container">
      <div className="chatOpenCloseBtn">
        <i class="fa-solid fa-xmark"></i><i class="fa-solid fa-message"></i>
      </div>


      <div className="chatbot_popup">
        {/* Chatbot Header */}
        <div className="chat_header">
          <div className="header_info">
            <ChatbotIcon />
            <h2 className="logo_text">
              Chatbot
            </h2>
          </div>
          <i class="fa-solid fa-chevron-down"></i>
        </div>

        {/* Chatbot body */}
        <div className="chat_body">
          <div className="message model_message">
            <ChatbotIcon />
            <p className='message_text'>
              Hey there! 👋 <br /> How can I help you today?
            </p>
          </div>
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} message={message}/>
          ))}
        </div>

        {/* Chat footer */}
        <div className="chat_footer">
          <ChatForm setChatHistory={setChatHistory} getBotResponse={getBotResponse} chatHistory={chatHistory}/>
        </div>
      </div>

    </div>
  )
}

export default App
