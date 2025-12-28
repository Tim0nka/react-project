import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { currentUser, users, posts } = useAppContext();
  const user = users[currentUser] || { 
    username: 'bulba', 
    name: 'Bulba', 
    bio: 'Создатель BulbaGramm'
  };
  
  const userPosts = posts
    .filter(p => p.authorId === currentUser)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">{user.username.charAt(0)}</div>
        <div className="profile-info">
          <div className="profile-username">{user.username}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-bio">{user.bio || 'Нет биографии'}</div>
        </div>
      </div>
      
      <div className="profile-stats">
        <div>
          <strong>{userPosts.length}</strong>
          <div>Посты</div>
        </div>
        <div>
          <strong>156</strong>
          <div>Подписчики</div>
        </div>
        <div>
          <strong>210</strong>
          <div>Подписки</div>
        </div>
      </div>
      
      <div className="profile-posts">
        {userPosts.map(post => (
          <div 
            key={post.id} 
            className="profile-post"
            style={{ 
              backgroundImage: post.image ? `url(${post.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: post.image ? 'transparent' : '#333'
            }}
          >
            {!post.image && (
              <div style={{ color: '#b3b3b3', fontSize: '14px', padding: '10px' }}>
                {post.content.substring(0, 30)}...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}