import { useAppContext } from '../context/AppContext';

export default function Search() {
  const { searchQuery, searchContent } = useAppContext();
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => window.history.back()}
          style={{ background: 'none', border: 'none', color: '#0095f6', fontSize: '18px' }}
        >
          ←
        </button>
        <h2 style={{ color: '#0095f6', marginLeft: '12px' }}>Поиск</h2>
      </div>
      
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
      
      <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <div style={{ color: '#888', fontSize: '14px' }}>
          Поиск временно не работает. Это учебный проект.
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#0095f6', marginBottom: '12px' }}>Популярные пользователи</h3>
        
        <div style={{ backgroundColor: '#1e1e1e', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>student</div>
          <div style={{ color: '#888', fontSize: '14px' }}>Учусь программировать</div>
        </div>
        
        <div style={{ backgroundColor: '#1e1e1e', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>designer</div>
          <div style={{ color: '#888', fontSize: '14px' }}>Люблю красивые интерфейсы</div>
        </div>
      </div>
    </div>
  );
}