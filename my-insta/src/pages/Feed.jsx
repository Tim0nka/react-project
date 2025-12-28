import { useAppContext } from '../context/AppContext';
import Post from '../components/Post';

export default function Feed() {
  const { posts, isLoading } = useAppContext();
  
  if (isLoading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#b3b3b3'
      }}>
        Загрузка постов...
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#b3b3b3'
      }}>
        Нет постов для отображения
      </div>
    );
  }
  
  return (
    <div>
      {posts.map(post => (
        <Post key={post.id || Date.now()} post={post} />
      ))}
    </div>
  );
}