import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon } from '../components/icons.jsx';

export default function Direct() {
  const { 
    chats, 
    activeChat, 
    setActiveChat, 
    users, 
    currentUser, 
    sendMessage,
    setPage
  } = useAppContext();
  
  const [messageText, setMessageText] = useState('');
  
  if (!Array.isArray(chats) || !users) {
    return (
      <div style={{ 
        padding: '20px', 
        color: '#b3b3b3',
        textAlign: 'center'
      }}>
        Загрузка...
      </div>
    );
  }
  
  if (activeChat) {
    const currentChat = chats.find(c => c.id === activeChat);
    if (!currentChat) {
      return (
        <div style={{ 
          padding: '20px', 
          color: '#b3b3b3',
          textAlign: 'center'
        }}>
          Чат не найден
        </div>
      );
    }
    
    const otherUserId = currentChat.participants.find(id => id !== currentUser);
    if (!otherUserId) {
      return (
        <div style={{ 
          padding: '20px', 
          color: '#b3b3b3',
          textAlign: 'center'
        }}>
          Ошибка в чате
        </div>
      );
    }
    
    const otherUser = users[otherUserId] || { username: 'Пользователь' };
    
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#121212' }}>
        <div style={{ 
          flex: 1, 
          padding: '16px', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {Array.isArray(currentChat.messages) && currentChat.messages.length > 0 ? (
            currentChat.messages.map((msg, i) => (
              <div 
                key={i} 
                style={{ 
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  background: msg.senderId === currentUser ? '#0095f6' : 'rgba(255,255,255,0.1)',
                  color: msg.senderId === currentUser ? 'white' : '#b3b3b3',
                  alignSelf: msg.senderId === currentUser ? 'flex-end' : 'flex-start',
                  fontSize: '14px',
                  wordBreak: 'break-word'
                }}
              >
                {msg.text}
                <div style={{ 
                  fontSize: '10px', 
                  opacity: '0.8', 
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  {msg.timestamp}
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: '#b3b3b3', textAlign: 'center', padding: '20px' }}>
              Нет сообщений
            </div>
          )}
        </div>
        
        <div style={{ 
          padding: '16px', 
          borderTop: '1px solid #333',
          background: '#1e1e1e',
          position: 'sticky',
          bottom: 0
        }}>
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
                padding: '12px 20px',
                borderRadius: '24px',
                border: '1px solid #333',
                background: '#121212',
                color: 'white',
                fontSize: '14px'
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
                borderRadius: '24px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ color: '#0095f6', marginBottom: '16px' }}>Сообщения</h2>
      
      {chats
        .filter(chat => chat && chat.participants && chat.participants.includes(currentUser))
        .sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime))
        .map(chat => {
          if (!chat) return null;
          
          const otherUserId = chat.participants.find(id => id !== currentUser);
          if (!otherUserId) return null;
          
          const otherUser = users[otherUserId] || { username: 'Пользователь' };
          
          return (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat.id)}
              style={{ 
                padding: '16px 0',
                borderBottom: '1px solid #333',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '50%', 
                  background: '#333', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '16px',
                  color: '#b3b3b3',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}>
                  {otherUser.username.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                    {otherUser.username}
                  </div>
                  <div style={{ color: '#b3b3b3', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.lastMessage || 'Нет сообщений'}
                  </div>
                </div>
                <div style={{ color: '#b3b3b3', fontSize: '12px', minWidth: '40px', textAlign: 'right' }}>
                  {chat.lastTime || ''}
                </div>
              </div>
            </div>
          );
        })}
        
      {chats.filter(chat => chat && chat.participants && chat.participants.includes(currentUser)).length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#b3b3b3' }}>
          У вас пока нет сообщений
        </div>
      )}
    </div>
  );
}