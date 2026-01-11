import { useAppContext } from '../context/AppContext';
import { SearchIcon, DirectIcon, ArrowLeftIcon } from './icons.jsx';

export default function Header() {
  const { 
    page, 
    setPage, 
    searchQuery, 
    searchContent,
    activeChat,
    setActiveChat,
    chats,
    users,
    currentUser
  } = useAppContext();

  const getTitle = () => {
    switch(page) {
      case 'feed': return 'BulbaGramm';
      case 'profile': return 'Профиль';
      case 'direct': 
        if (activeChat) {
          const chat = chats.find(c => c.id === activeChat);
          if (chat) {
            const otherUserId = chat.participants.find(id => id !== currentUser);
            const otherUser = users[otherUserId];
            return otherUser?.username || 'Сообщения';
          }
        }
        return 'Директ';
      case 'search': return 'Поиск';
      case 'create': return 'Новый пост';
      default: return 'BulbaGramm';
    }
  };

  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {(page === 'search' || page === 'create' || page === 'profile' || (page === 'direct' && activeChat)) && (
          <button 
            className="nav-btn"
            onClick={() => {
              if (page === 'search') {
                setPage('feed');
                setSearchQuery('');
                searchContent('');
              } else if (page === 'create') {
                setPage('feed');
              } else if (page === 'profile') {
                setPage('feed');
              } else if (activeChat) {
                setActiveChat(null);
              }
            }}
          >
            <ArrowLeftIcon />
          </button>
        )}
        
        {page === 'direct' && !activeChat && (
          <button 
            className="nav-btn"
            onClick={() => setPage('feed')}
          >
            <ArrowLeftIcon />
          </button>
        )}
        
        <div className="logo">{getTitle()}</div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px' }}>
        {page === 'feed' && (
          <>
            <button 
              className="nav-btn"
              onClick={() => setPage('search')}
            >
              <SearchIcon active={page === 'search'} />
            </button>
            
            <button 
              className="nav-btn"
              onClick={() => {
                setPage('direct');
                setActiveChat(null);
              }}
            >
              <DirectIcon active={page === 'direct'} />
            </button>
          </>
        )}
        
        {page === 'search' && (
          <button 
            className="nav-btn"
            onClick={() => {
              setPage('feed');
              setSearchQuery('');
              searchContent('');
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}