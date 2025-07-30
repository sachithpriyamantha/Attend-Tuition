import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple bot responses - you can expand this with more sophisticated logic
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Basic keyword-based responses
     // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! Welcome to Dockyard Tuition. How can I help you today?";
    }

    // Help & Support
    if (message.includes('help') || message.includes('support')) {
        return "I'm here to help! You can ask me about attendance, fees, schedules, teachers, or anything else.";
    }

    // Pricing & Fees
    if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('pricing')) {
        return "Our fees vary by course. Please check the 'Pricing' section or email billing@dockyardtuition.com for details.";
    }

    // Contact Information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
        return "📧 Email: contact@dockyardtuition.com\n📞 Phone: (072) 123-4567\n📍 Address: 123 Education St, Learning City.";
    }

    // Operating Hours
    if (message.includes('hours') || message.includes('open') || message.includes('time') || message.includes('schedule')) {
        return "⏰ We're open:\n- Mon-Fri: 9 AM - 6 PM\n- Sat: 10 AM - 2 PM\n- Sun: Closed";
    }

    // Attendance Related
    if (message.includes('attendance') || message.includes('mark present') || message.includes('absent')) {
        if (message.includes('check')) {
            return "You can check your attendance in the 'Attendance' section of your student portal.";
        } else if (message.includes('forgot') || message.includes('missed')) {
            return "If you forgot to mark attendance, inform your teacher, and they can update it manually.";
        } else {
            return "To mark attendance, log in and click 'Mark Attendance'. Need more help?";
        }
    }

    // Class Schedule
    if (message.includes('class') || message.includes('schedule') || message.includes('timing')) {
        if (message.includes('next')) {
            return "Check your upcoming classes in the 'Timetable' section.";
        } else if (message.includes('holiday')) {
            return "Holidays are listed in the 'Announcements' section.";
        } else {
            return "Class schedules are available in your dashboard. Need a specific batch timing?";
        }
    }

    // Teachers & Study Material
    if (message.includes('teacher') || message.includes('notes') || message.includes('study')) {
        if (message.includes('contact')) {
            return "Use the 'Chat with Teacher' feature in your portal to message them.";
        } else if (message.includes('change')) {
            return "Teacher changes are subject to availability. Email admin@dockyardtuition.com.";
        } else {
            return "Study materials are in the 'Resources' section. Teachers' info is under 'Faculty'.";
        }
    }

    // Payments
    if (message.includes('pay') || message.includes('fee') || message.includes('installment')) {
        if (message.includes('receipt')) {
            return "Download fee receipts from the 'Payments' section.";
        } else if (message.includes('discount')) {
            return "Siblings get a 10% discount! Contact us for details.";
        } else {
            return "Pay online via the 'Payments' tab or visit the center for offline payment.";
        }
    }

    // Technical Support
    if (message.includes('password') || message.includes('login') || message.includes('account')) {
        return "🔒 For login issues, click 'Forgot Password' or email techsupport@dockyardtuition.com.";
    }

    // Feedback & General
    if (message.includes('feedback') || message.includes('suggestion')) {
        return "We appreciate your feedback! Email feedback@dockyardtuition.com.";
    }

    if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! Let me know if you need anything else.";
    }

    
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Feel free to reach out anytime if you need assistance.";
    }
    
    // Default response
    return "I understand you're asking about: '" + userMessage + "'. Could you please provide more details so I can assist you better?";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    width: '350px',
    height: '500px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    boxShadow: '0 5px 30px rgba(0,0,0,0.2)',
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '15px',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f9f9f9'
  };

  const messageStyle = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column'
  };

  const userMessageStyle = {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '15px 15px 5px 15px',
    maxWidth: '80%',
    wordWrap: 'break-word'
  };

  const botMessageStyle = {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#333',
    padding: '8px 12px',
    borderRadius: '15px 15px 15px 5px',
    maxWidth: '80%',
    border: '1px solid #e0e0e0',
    wordWrap: 'break-word'
  };

  const timestampStyle = {
    fontSize: '10px',
    color: '#888',
    marginTop: '2px'
  };

  const inputContainerStyle = {
    display: 'flex',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '0 0 10px 10px',
    borderTop: '1px solid #e0e0e0'
  };

  const inputStyle = {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    outline: 'none',
    fontSize: '14px'
  };

  const sendButtonStyle = {
    marginLeft: '8px',
    padding: '8px 15px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const toggleButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    zIndex: 1001
  };

  const typingIndicatorStyle = {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#666',
    padding: '8px 12px',
    borderRadius: '15px 15px 15px 5px',
    border: '1px solid #e0e0e0',
    fontStyle: 'italic'
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <button
        style={toggleButtonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      <div style={chatWindowStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Customer Support</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Online now</div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            
          </button>
        </div>

        {/* Messages Container */}
        <div style={messagesContainerStyle}>
          {messages.map((message) => (
            <div key={message.id} style={messageStyle}>
              <div
                style={message.sender === 'user' ? userMessageStyle : botMessageStyle}
              >
                {message.text}
              </div>
              <div

                style={{
                  ...timestampStyle,
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div style={messageStyle}>
              <div style={typingIndicatorStyle}>
                Bot is typing...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        

        {/* Input Container */}
        <div style={inputContainerStyle}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={inputStyle}
          />
          <button
            onClick={handleSendMessage}
            style={sendButtonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;