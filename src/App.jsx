import ChatbotIcon from './components/ChatbotIcon.jsx'
import ChatForm from './components/ChatForm.jsx'
import ChatMessage from './components/ChatMessage.jsx'

function App() {

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
            <ChatMessage />
        </div>

        {/* Chat footer */}
        <div className="chat_footer">
          <ChatForm />
        </div>
      </div>

    </div>
  )
}

export default App
