export default function Message({ message, isCurrentUser }) {
    return (
      <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
        {message.text}
        <span className="message-time">{message.timestamp}</span>
      </div>
    );
  }