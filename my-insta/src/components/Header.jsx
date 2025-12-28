import { useAppContext } from '../context/AppContext';
import { SearchIcon, DirectIcon, ArrowLeftIcon } from './icons.jsx';

export default function Header() {
  const { 
    page, 
    setPage, 
    searchQuery, 
    searchContent,
    activeChat,
    setActiveChat
  } = useAppContext();

  const getTitle = () => {
    switch(page) {
      case 'feed': return 'BulbaGramm';
      case 'profile': return 'Профиль';
      case 'direct': return activeChat ? 'Сообщения' : 'Директ';
      case 'search': return 'Поиск';
      case 'create': return 'Новый пост';
      default: return 'BulbaGramm';
    }
  };

  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {(page === 'search' || (page === 'direct' && activeChat)) && (
          <button 
            className="nav-btn"
            onClick={() => {
              if (page === 'search') {
                setPage('feed');
              } else if (activeChat) {
                setActiveChat(null);
              }
            }}
          >
            <ArrowLeftIcon />
          </button>
        )}
        <div className="logo">{getTitle()}</div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px' }}>
        {page === 'search' ? (
          <button 
            className="nav-btn"
            onClick={() => setPage('feed')}
          >
            Отмена
          </button>
        ) : (
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
      </div>
    </div>
  );
}