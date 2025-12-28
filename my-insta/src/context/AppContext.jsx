import { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../utils/db';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(db.getCurrentUser());
  const [users, setUsers] = useState(db.getUsers());
  const [posts, setPosts] = useState(db.getPosts());
  const [chats, setChats] = useState(db.getChats());
  const [activeChat, setActiveChat] = useState(null);
  const [page, setPage] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Инициализация данных
    setUsers(db.getUsers());
    setPosts(db.getPosts());
    setChats(db.getChats());
    setIsLoading(false);
  }, []);

  // Функция добавления поста
  const addPost = (content, imageFile) => {
    if (!content.trim() && !imageFile) return;
    
    let imageUrl = null;
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }
    
    const newPost = {
      id: `post_${Date.now()}`,
      authorId: currentUser,
      content: content.trim(),
      image: imageUrl,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    const newPosts = [newPost, ...posts];
    setPosts(newPosts);
    db.savePosts(newPosts);
    setPage('feed');
  };

  // Функция отправки сообщения
  const sendMessage = (chatId, text) => {
    if (!text.trim() || !chatId) return;
    
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage = {
            id: `msg_${Date.now()}`,
            text: text.trim(),
            senderId: currentUser,
            timestamp: new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          };
          
          return {
            ...chat,
            messages: [...(chat.messages || []), newMessage],
            lastMessage: text.trim(),
            lastTime: newMessage.timestamp
          };
        }
        return chat;
      });
    });
  };

  // Функция поиска
  const searchContent = (query) => {
    setSearchQuery(query);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      posts,
      chats,
      activeChat,
      page,
      searchQuery,
      isLoading,
      
      setCurrentUser,
      setPage,
      setActiveChat,
      searchContent,
      addPost,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);