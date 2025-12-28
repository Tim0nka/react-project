import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CommentBox from './CommentBox';
import LikeButton from './LikeButton';

export default function Post({ post }) {
  const { users, userLikes, toggleLike, addComment } = useAppContext();
  
  // Защита от undefined - если post не передан
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
  
  // Защита от undefined для автора
  const author = users[post.authorId] || { 
    username: 'unknown', 
    name: 'Неизвестный автор'
  };
  
  // Проверяем, есть ли лайк от текущего пользователя
  const isLiked = userLikes && userLikes[post.id] ? true : false;
  
  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar">{author.username.charAt(0)}</div>
        <div className="post-username">{author.username}</div>
      </div>
      
      {post.image && (
        <div style={{ 
          width: '100%', 
          height: '400px', 
          background: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#b3b3b3'
        }}>
          {post.content.substring(0, 50)}...
        </div>
      )}
      
      <div className="post-actions">
        <LikeButton 
          postId={post.id} 
          likesCount={post.likes || 0} 
          isLiked={isLiked} 
          onToggle={toggleLike}
        />
        <button className="action-btn">💬</button>
      </div>
      
      <div className="post-caption">
        <strong>{author.username}</strong> {post.content}
      </div>
      
      <CommentBox 
        postId={post.id} 
        comments={post.comments || []} 
        onAddComment={addComment}
      />
    </div>
  );
}