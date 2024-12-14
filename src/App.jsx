import { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon.jsx'
import ChatForm from './components/ChatForm.jsx'
import ChatMessage from './components/ChatMessage.jsx'
import { companyInfo } from './companyInfo.js'

function App() {
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true,
    role: 'model',
    text: companyInfo
  }])
  const [openChat, setOpenChat] = useState(true)
  const historyRef = useRef()

  useEffect(() => {
    historyRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  const updateHistory = (apiRes, isError = false) => {
    setChatHistory(prev => [...prev.filter(msg => msg.text !== 'Thinking...'), { role: 'model', text: apiRes, isError }])
  }

  const generateBotResponse = async (history) => {
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }))

    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({ contents: history })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error.message || 'Something went wrong')

      const apiRes = await data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Italics
        .replace(/## (.*?)\n/g, '<h2>$1</h2>')           // H2 Headings
        .replace(/# (.*?)\n/g, '<h1>$1</h1>');

      updateHistory(apiRes)
    } catch (error) {
      updateHistory(error.message, true)
    }
  }

  const popupToggle = () => {
    setOpenChat(chat => !chat)
  }

  return (
    <div className="container">
      <div className="chatOpenCloseBtn" onClick={popupToggle}>
        {openChat ? (<i class="fa-solid fa-xmark"></i>) : (<i class="fa-solid fa-message"></i>)}
      </div>

      {openChat && (
        <div className="chatbot_popup">
          {/* Chatbot Header */}
          <div className="chat_header">
            <div className="header_info">
              <ChatbotIcon />
              <h2 className="logo_text">
                Chatbot
              </h2>
            </div>
            <i class="fa-solid fa-chevron-down" onClick={popupToggle}></i>
          </div>

          {/* Chatbot body */}
          <div ref={historyRef} className="chat_body">
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
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
