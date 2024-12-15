import { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon.jsx'
import ChatForm from './components/ChatForm.jsx'
import ChatMessage from './components/ChatMessage.jsx'
import { companyInfo } from './companyInfo.js'

function App() {
  const [chatHistory, setChatHistory] = useState([{
    role: 'model',
    text: companyInfo,
    isHidden: true
  }])
  const [chatToggle, setChatToggle] = useState(true)
  const [canSend, setCanSend] = useState(true)
  const chatRef = useRef()

  useEffect(() => {
    chatRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  const updateChatHistory = (botResponse, isError = false) => {
    setChatHistory(prev => [...prev.filter((msg) => msg.text !== 'Thinking...'), { role: 'model', text: botResponse, isError }])
    setCanSend(true)
  }

  const getBotResponse = async (history) => {
    history = history.map(({ role, text }) => ({ role, "parts": [{ text }] }))

    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: history
      })
    }

    try {
      const APIResponse = await fetch(import.meta.env.VITE_API_URL, requestParams)
      const data = await APIResponse.json()

      if (!APIResponse.ok) throw new Error(data.error.message || 'Something went wrong')

      const botResponse = await data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Italics
        .replace(/## (.*?)\n/g, '<h2>$1</h2>')           // H2 Headings
        .replace(/# (.*?)\n/g, '<h1>$1</h1>');

      updateChatHistory(botResponse)
    } catch (error) {
      updateChatHistory('Sorry, the bot is not responding. Please, try again later', true)
    }
  }

  return (
    <div className="container">
      <div className="chatOpenCloseBtn" onClick={() => setChatToggle(toggle => !toggle)}>
        {chatToggle ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-message"></i>}
      </div>

      {chatToggle && (
        <div className="chatbot_popup">
          {/* Chatbot Header */}
          <div className="chat_header">
            <div className="header_info">
              <ChatbotIcon />
              <h2 className="logo_text">
                Chatbot
              </h2>
            </div>
            <i class="fa-solid fa-chevron-down" onClick={() => setChatToggle(toggle => !toggle)}></i>
          </div>

          {/* Chatbot body */}
          <div className="chat_body" ref={chatRef}>
            <div className="message model_message">
              <ChatbotIcon />
              <p className='message_text'>
                Hey there! 👋 <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>

          {/* Chat footer */}
          <div className="chat_footer">
            <ChatForm setChatHistory={setChatHistory} getBotResponse={getBotResponse} chatHistory={chatHistory} canSend={canSend} setCanSend={setCanSend}/>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
