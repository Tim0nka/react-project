import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { 
    currentUser, 
    users, 
    posts, 
    editProfile, 
    setPage,
    viewingUserId,
    setViewingUserId
  } = useAppContext();
  
  // Если viewingUserId установлен, показываем профиль этого пользователя
  const userIdToShow = viewingUserId || currentUser;
  const user = users[userIdToShow] || { 
    username: 'bulba', 
    name: 'Bulba', 
    bio: 'Создатель BulbaGramm',
    followers: [],
    following: []
  };
  
  const userPosts = posts
    .filter(p => p.authorId === userIdToShow)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newBio, setNewBio] = useState(user.bio);
  
  const isOwnProfile = userIdToShow === currentUser;

  useEffect(() => {
    // Сбрасываем viewingUserId при уходе со страницы
    return () => {
      if (viewingUserId) {
        setViewingUserId(null);
      }
    };
  }, [viewingUserId, setViewingUserId]);

  const handleEditProfile = () => {
    if (editProfile(newUsername, newBio, null)) {
      setIsEditing(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => {
            if (viewingUserId) {
              setViewingUserId(null);
            } else {
              setPage('feed');
            }
          }}
          style={{ background: 'none', border: 'none', color: '#0095f6', fontSize: '18px' }}
        >
          ←
        </button>
        <h2 style={{ color: '#0095f6', marginLeft: '12px' }}>Профиль</h2>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          backgroundColor: '#333', 
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          color: '#b3b3b3',
          fontWeight: 'bold'
        }}>
          {user.username.charAt(0)}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
          {user.username}
        </div>
        <div style={{ color: '#b3b3b3', marginBottom: '8px' }}>
          {user.name}
        </div>
        <div style={{ color: '#888', fontSize: '14px' }}>
          {user.bio || 'Нет биографии'}
        </div>
      </div>
      
      {isOwnProfile && (
        <button
          onClick={() => setIsEditing(true)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#0095f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Редактировать профиль
        </button>
      )}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{userPosts.length}</div>
          <div style={{ color: '#b3b3b3', fontSize: '14px' }}>Посты</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{user.followers?.length || 0}</div>
          <div style={{ color: '#b3b3b3', fontSize: '14px' }}>Подписчики</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{user.following?.length || 0}</div>
          <div style={{ color: '#b3b3b3', fontSize: '14px' }}>Подписки</div>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '4px'
      }}>
        {userPosts.map(post => (
          <div 
            key={post.id} 
            style={{ 
              aspectRatio: '1/1',
              backgroundColor: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b3b3b3',
              fontSize: '12px'
            }}
          >
            {post.content.substring(0, 10)}...
          </div>
        ))}
      </div>
      
      {isEditing && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: '#1e1e1e', 
            borderRadius: '8px', 
            padding: '20px', 
            width: '90%', 
            maxWidth: '500px'
          }}>
            <h3 style={{ color: '#0095f6', marginBottom: '16px' }}>Редактирование профиля</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#b3b3b3' }}>Имя пользователя:</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid #333', 
                  background: '#121212', 
                  color: 'white'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#b3b3b3' }}>Статус:</label>
              <textarea
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid #333', 
                  background: '#121212', 
                  color: 'white',
                  minHeight: '80px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleEditProfile}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  background: '#0095f6', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Сохранить
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  background: '#ed4956', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}