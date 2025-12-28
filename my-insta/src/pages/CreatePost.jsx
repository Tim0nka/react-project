import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function CreatePost() {
  const { addPost, setPage } = useAppContext();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(content, image);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => setPage('feed')}
          style={{ background: 'none', border: 'none', color: '#0095f6', fontSize: '18px' }}
        >
          ←
        </button>
        <h2 style={{ color: '#0095f6', marginLeft: '12px' }}>Новый пост</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ 
          width: '100%', 
          height: '200px', 
          backgroundColor: '#333', 
          borderRadius: '8px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888'
        }}>
          {image ? 'Изображение выбрано' : 'Выберите фото'}
        </div>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Что у вас нового?"
          style={{ 
            width: '100%', 
            height: '150px', 
            padding: '16px', 
            borderRadius: '8px', 
            border: '1px solid #333', 
            background: '#121212', 
            color: 'white',
            fontSize: '16px',
            resize: 'vertical',
            marginBottom: '20px'
          }}
        />
        
        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: '#0095f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
}