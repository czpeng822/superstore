import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

const ChatComponent = () => {
  const { userAccount, products } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMessageSubmit = async () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({
          prompt: input,
          max_tokens: 50, // 最大生成标记数量
        }),
      });

      const data = await response.json();
      setMessages([...messages, { text: data.choices[0].text.trim(), sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
    setInput('');
  };

  useEffect(() => {
    const welcomeMessage = "Hi there! How can I assist you today?";
    setMessages([{ text: welcomeMessage, sender: 'bot' }]);
  }, []);

  return (
    <div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleMessageSubmit();
          }
        }}
        placeholder="Type your message here..."
      />
      <button onClick={handleMessageSubmit} disabled={loading}>
        Send
      </button>
    </div>
  );
};

export default ChatComponent;
