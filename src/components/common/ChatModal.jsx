import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { getCookie } from '@/CustomServices/GetCookies';

const ChatModal = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const token = getCookie('token');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && token && user) {
      // Create WebSocket connection
      const wsUrl = `ws://localhost:8000/ws/faq?token=${token}&role=${user.interested}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            text: data.message || data.text || event.data,
            isUser: false,
            timestamp: new Date()
          }]);
        } catch (error) {
          // If it's not JSON, treat as plain text
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            text: event.data,
            isUser: false,
            timestamp: new Date()
          }]);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        setSocket(null);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      return () => {
        ws.close();
      };
    }
  }, [isOpen, token, user]);

  const sendMessage = () => {
    if (newMessage.trim() && socket && isConnected) {
      const messageData = {
        id: Date.now(),
        text: newMessage,
        isUser: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, messageData]);
      
      // Send message through WebSocket
      socket.send(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          backgroundColor: '#00a76f',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={20} />
            <span style={{ fontWeight: '600' }}>FAQ Chat</span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isConnected ? '#4ade80' : '#ef4444'
            }} />
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {messages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#666',
              marginTop: '50px'
            }}>
              <MessageCircle size={48} color="#ccc" />
              <p style={{ marginTop: '12px' }}>Start a conversation!</p>
              <p style={{ fontSize: '14px', color: '#999' }}>
                Ask any questions about our properties or services.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div className={`message-bubble ${message.isUser ? 'user-message' : 'bot-message'}`}>
                  {message.text}
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={!isConnected}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: isConnected && newMessage.trim() ? '#00a76f' : '#ccc',
              border: 'none',
              color: 'white',
              cursor: isConnected && newMessage.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
