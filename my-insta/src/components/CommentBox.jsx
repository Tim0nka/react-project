import { useState } from 'react';

export default function CommentBox({ postId, comments = [], onAddComment }) {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(postId, commentText);
      setCommentText('');
    }
  };
  
  return (
    <div>
      <div className="comments-section">
        {comments.map((comment, i) => (
          <div key={i} className="comment">
            <span className="comment-author">{comment.authorId}: </span>
            {comment.text}
          </div>
        ))}
      </div>
      
      <div className="comment-input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Добавить комментарий..."
            className="comment-field"
          />
          <button type="submit" className="comment-btn">Отправить</button>
        </form>
      </div>
    </div>
  );
}