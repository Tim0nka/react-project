import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Search() {
  const { searchQuery, searchContent, searchResults, viewUserProfile, setPage, clearViewingUser } = useAppContext();
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setError('');
      return;
    }
    
    if (searchResults.length === 0 && searchQuery.trim() !== '') {
      setError('Ошибка, данный пользователь не найден');
    } else {
      setError('');
    }
  }, [searchQuery, searchResults]);

  const handleUserClick = (userId) => {
    clearViewingUser(); // Очищаем предыдущее состояние
    setTimeout(() => {
      viewUserProfile(userId);
    }, 50);
  };

  return (
    <div style={{ padding: '16px', paddingTop: '60px' }}>
      <input
        type="text"
        placeholder="Поиск пользователей..."
        value={searchQuery}
        onChange={(e) => searchContent(e.target.value)}
        autoFocus
        style={{ 
          width: '100%', 
          padding: '14px 20px', 
          borderRadius: '8px', 
          border: '1px solid #333', 
          background: '#121212', 
          color: 'white', 
          fontSize: '16px',
          marginBottom: '20px'
        }}
      />
      
      {error && (
        <div style={{ 
          color: '#ed4956', 
          padding: '12px', 
          backgroundColor: 'rgba(237, 73, 86, 0.1)', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      {searchResults.map(user => (
        <div 
          key={user.id} 
          onClick={() => handleUserClick(user.id)}
          style={{ 
            padding: '16px', 
            borderBottom: '1px solid #333', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: '#333', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: '16px',
            color: '#b3b3b3',
            fontWeight: 'bold'
          }}>
            {user.username.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '16px' }}>{user.username}</div>
            <div style={{ color: '#b3b3b3', fontSize: '14px' }}>{user.name}</div>
          </div>
        </div>
      ))}
      
      {searchQuery.trim() !== '' && searchResults.length === 0 && !error && (
        <div style={{ color: '#b3b3b3', textAlign: 'center', padding: '20px' }}>
          Ничего не найдено
        </div>
      )}
      
      {searchQuery.trim() === '' && (
        <div>
          <h3 style={{ color: '#0095f6', marginBottom: '12px' }}>Популярные пользователи</h3>
          
          <div 
            onClick={() => handleUserClick('user1')}
            style={{ 
              padding: '16px', 
              backgroundColor: '#1e1e1e', 
              borderRadius: '8px', 
              marginBottom: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>user1</div>
            <div style={{ color: '#b3b3b3', fontSize: '14px' }}>Пользователь 1</div>
          </div>
          
          <div 
            onClick={() => handleUserClick('user2')}
            style={{ 
              padding: '16px', 
              backgroundColor: '#1e1e1e', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>user2</div>
            <div style={{ color: '#b3b3b3', fontSize: '14px' }}>Пользователь 2</div>
          </div>
        </div>
      )}
    </div>
  );
}