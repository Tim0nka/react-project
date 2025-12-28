import { HeartIcon } from './icons';

export default function LikeButton({ postId, likesCount = 0, isLiked = false, onToggle }) {
  return (
    <button 
      className={`action-btn ${isLiked ? 'liked' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onToggle) {
          onToggle(postId);
        }
      }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px',
        background: 'none',
        border: 'none',
        color: isLiked ? '#ed4956' : '#b3b3b3',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      <HeartIcon active={isLiked} filled={isLiked} />
      <span>{likesCount}</span>
    </button>
  );
}