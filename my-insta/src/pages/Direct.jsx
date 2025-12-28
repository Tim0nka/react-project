import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Direct() {
  const { 
    chats, 
    activeChat, 
    setActiveChat, 
    users, 
    currentUser, 
    sendMessage
  } = useAppContext();
  
  const [messageText, setMessageText] = useState('');
  const currentChat = activeChat ? chats.find(c => c.id === activeChat) : null;
  
  if (!activeChat) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#0095f6', marginBottom: '20px' }}>Сообщения</h2>
        
        {chats
          .filter(chat => chat.participants.includes(currentUser))
          .map(chat => {
            const otherUserId = chat.participants.find(id => id !== currentUser);
            const otherUser = users[otherUserId] || { username: 'Пользователь' };
            
            return (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                style={{ 
                  padding: '16px', 
                  borderBottom: '1px solid #333', 
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {otherUser.username}
                </div>
                <div style={{ color: '#888', fontSize: '14px' }}>
                  {chat.lastMessage || 'Нет сообщений'}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  
  if (!currentChat) {
    return (
      <div style={{ padding: '20px', color: '#888' }}>
        Чат не найден
      </div>
    );
  }
  
  const otherUserId = currentChat.participants.find(id => id !== currentUser);
  const otherUser = users[otherUserId] || { username: 'Пользователь' };
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #333' }}>
        <button 
          onClick={() => setActiveChat(null)}
          style={{ background: 'none', border: 'none', color: '#0095f6', fontSize: '18px' }}
        >
          ← Назад
        </button>
        <h2 style={{ color: '#0095f6' }}>{otherUser.username}</h2>
      </div>
      
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {currentChat.messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              padding: '10px', 
              margin: '8px 0', 
              backgroundColor: msg.senderId === currentUser ? '#0095f6' : '#333',
              borderRadius: '8px',
              color: msg.senderId === currentUser ? 'white' : '#fff'
            }}
          >
            {msg.text}
            <div style={{ fontSize: '12px', color: '#888', textAlign: 'right' }}>
              {msg.timestamp}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ padding: '16px', borderTop: '1px solid #333' }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (messageText.trim()) {
            sendMessage(activeChat, messageText);
            setMessageText('');
          }
        }}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Сообщение..."
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #333', 
              background: '#121212', 
              color: 'white',
              marginBottom: '8px'
            }}
          />
          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#0095f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}