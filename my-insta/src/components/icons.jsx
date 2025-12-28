// src/components/icons.js
// Минимальная версия иконок без ошибок

export const HomeIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#0095f6' : '#b3b3b3'} strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
  
  export const SearchIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#0095f6' : '#b3b3b3'} strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
  
  export const AddIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#0095f6' : '#b3b3b3'} strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
  
  export const HeartIcon = ({ active, filled }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? (active ? '#ed4956' : '#ed4956') : 'none'} stroke={active ? '#ed4956' : '#b3b3b3'} strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
  
  export const CommentIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#0095f6' : '#b3b3b3'} strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
  
  export const DirectIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#0095f6' : '#b3b3b3'} strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
  
  export const UserIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#0095f6' : '#b3b3b3'} strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  



  export const ArrowLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0095f6" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );


  
  // Экспортируем все иконки как один объект для удобства
  export default {
    HomeIcon,
    SearchIcon,
    AddIcon,
    HeartIcon,
    CommentIcon,
    DirectIcon,
    UserIcon
  };