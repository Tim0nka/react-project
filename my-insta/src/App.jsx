import { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Direct from './pages/Direct';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import CreatePost from './pages/CreatePost';
import { HomeIcon, SearchIcon, AddIcon, DirectIcon, UserIcon } from './components/icons.jsx';


function MainPage() {
  const { page, setPage, isLoading } = useAppContext();
  
  const renderPage = () => {
    switch(page) {
      case 'feed': return <Feed />;
      case 'profile': return <Profile />;
      case 'direct': return <Direct />;
      case 'search': return <Search />;
      case 'notifications': return <Notifications />;
      case 'create': return <CreatePost />;
      default: return <Feed />;
    }
  };
  
  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#b3b3b3'
      }}>
        Загрузка...
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <Header />
      
      <main style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        {renderPage()}
      </main>
      
      <nav className="bottom-nav">
        <button 
          onClick={() => setPage('feed')}
          className={page === 'feed' ? 'active' : ''}
        >
          <HomeIcon active={page === 'feed'} />
        </button>
        <button 
          onClick={() => setPage('search')}
          className={page === 'search' ? 'active' : ''}
        >
          <SearchIcon active={page === 'search'} />
        </button>
        <button 
          onClick={() => setPage('create')}
          className={page === 'create' ? 'active' : ''}
        >
          <AddIcon active={page === 'create'} />
        </button>
        <button 
          onClick={() => setPage('direct')}
          className={page === 'direct' ? 'active' : ''}
        >
          <DirectIcon active={page === 'direct'} />
        </button>
        <button 
          onClick={() => setPage('profile')}
          className={page === 'profile' ? 'active' : ''}
        >
          <UserIcon active={page === 'profile'} />
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainPage />
    </AppProvider>
  );
}