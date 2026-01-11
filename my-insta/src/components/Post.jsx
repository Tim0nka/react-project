import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { HeartIcon, CommentIcon } from './icons.jsx';

export default function Post({ post }) {
  const { users, userLikes, toggleLike, addComment } = useAppContext();
  const [commentText, setCommentText] = useState('');
  
  if (!post) {
    return (
      <div style={{ 
        background: '#1e1e1e', 
        padding: '20px', 
        margin: '8px 0',
        borderRadius: '8px',
        color: '#b3b3b3',
        textAlign: 'center'
      }}>
        Пост не найден
      </div>
    );
  }
  
  const author = users[post.authorId] || { 
    username: post.authorId === 'bulba' ? 'Bulba' : 
             post.authorId === 'user1' ? 'user1' : 
             post.authorId === 'user2' ? 'user2' : 'unknown',
    name: 'Неизвестный автор'
  };
  
  const isLiked = userLikes[post.id] || false;
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };
  
  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar">{author.username.charAt(0)}</div>
        <div className="post-username">{author.username}</div>
      </div>
      
      {post.image ? (
        <img 
          src={post.image} 
          alt="post" 
          className="post-content"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://picsum.photos/seed/${post.id}/600/400`;
          }}
        />
      ) : (
        <div style={{ 
          width: '100%', 
          minHeight: '200px',
          background: '#333',
          padding: '16px',
          color: '#b3b3b3'
        }}>
          {post.content}
        </div>
      )}
      
      <div className="post-actions">
        <button 
          onClick={() => toggleLike(post.id)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: isLiked ? '#ed4956' : '#b3b3b3', 
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <HeartIcon active={isLiked} filled={isLiked} />
          <span>{post.likes || 0}</span>
        </button>
        <button 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#b3b3b3', 
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <CommentIcon active={false} />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>
      
      <div className="post-caption">
        <strong>{author.username}</strong> {post.content}
      </div>
      
      <div style={{ padding: '0 12px 12px' }}>
        {post.comments?.map((comment, i) => {
          const commentAuthor = users[comment.authorId] || { 
            username: comment.authorId === 'bulba' ? 'Bulba' : 
                     comment.authorId === 'user1' ? 'user1' : 
                     comment.authorId === 'user2' ? 'user2' : 'unknown'
          };
          
          return (
            <div key={i} style={{ padding: '4px 0', fontSize: '14px', color: '#b3b3b3' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>
                {commentAuthor.username}:
              </span> {comment.text}
            </div>
          );
        })}
      </div>
      
      <form onSubmit={handleSubmitComment} style={{ padding: '0 12px 12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Добавить комментарий..."
            style={{ 
              flex: 1, 
              padding: '8px 12px', 
              borderRadius: '8px', 
              border: '1px solid #333', 
              background: '#121212', 
              color: 'white'
            }}
          />
          <button 
            type="submit"
            style={{ 
              padding: '8px 16px', 
              background: '#0095f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}