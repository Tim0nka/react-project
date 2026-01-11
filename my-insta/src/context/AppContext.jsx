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
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLikes, setUserLikes] = useState({});
  const [viewingUserId, setViewingUserId] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(db.getUsers());
      setPosts(db.getPosts());
      setChats(db.getChats());
      setUserLikes(db.getUserLikes(currentUser) || {});
      setIsLoading(false);
    }, 300);
  };

  const addPost = (content, imageFile) => {
    if (!content.trim()) return;
    
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
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    const newPosts = [newPost, ...posts];
    setPosts(newPosts);
    db.savePosts(newPosts);
    setPage('feed');
  };

  const toggleLike = (postId) => {
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    
    const post = posts[postIndex];
    const isLiked = post.likedBy?.includes(currentUser) || userLikes[postId];
    
    let newLikes, newLikedBy;
    
    if (isLiked) {
      newLikes = Math.max(0, post.likes - 1);
      newLikedBy = post.likedBy?.filter(id => id !== currentUser) || [];
    } else {
      newLikes = post.likes + 1;
      newLikedBy = [...(post.likedBy || []), currentUser];
    }
    
    const newPosts = [...posts];
    newPosts[postIndex] = {
      ...post,
      likes: newLikes,
      likedBy: newLikedBy
    };
    
    setPosts(newPosts);
    db.savePosts(newPosts);
    
    const newLikesState = { ...userLikes };
    if (isLiked) {
      delete newLikesState[postId];
    } else {
      newLikesState[postId] = true;
    }
    
    setUserLikes(newLikesState);
    db.saveUserLikes(currentUser, newLikesState);
  };

  const addComment = (postId, text) => {
    if (!text.trim()) return;
    
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    
    const newPosts = [...posts];
    const post = newPosts[postIndex];
    
    const newComment = {
      id: `com_${Date.now()}`,
      text: text.trim(),
      authorId: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    post.comments = [...(post.comments || []), newComment];
    
    setPosts(newPosts);
    db.savePosts(newPosts);
  };

  const sendMessage = (chatId, text) => {
    if (!text.trim() || !chatId) return;
    
    const chatIndex = chats.findIndex(c => c.id === chatId);
    if (chatIndex === -1) return;
    
    const newChats = [...chats];
    const chat = newChats[chatIndex];
    
    const newMessage = {
      id: `msg_${Date.now()}`,
      text: text.trim(),
      senderId: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    chat.messages = [...(chat.messages || []), newMessage];
    chat.lastMessage = text.trim();
    chat.lastTime = newMessage.timestamp;
    
    setChats(newChats);
    db.saveChats(newChats);
  };

  const searchContent = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    Object.values(users).forEach(user => {
      if (user.username.toLowerCase().includes(lowerQuery) || 
          user.name.toLowerCase().includes(lowerQuery)) {
        results.push(user);
      }
    });
    
    setSearchResults(results);
  };

  const startChat = (userId) => {
    if (userId === currentUser) return;
    
    let chat = chats.find(c => 
      c.participants.includes(currentUser) && 
      c.participants.includes(userId)
    );
    
    if (!chat) {
      chat = {
        id: `chat_${Date.now()}`,
        participants: [currentUser, userId],
        messages: [],
        lastMessage: '',
        lastTime: ''
      };
      
      const newChats = [chat, ...chats];
      setChats(newChats);
      db.saveChats(newChats);
    }
    
    setActiveChat(chat.id);
    setPage('direct');
  };

  const editProfile = (newUsername, newBio, newAvatar) => {
    const updatedUsers = { ...users };
    const currentUserData = updatedUsers[currentUser];
    
    if (currentUserData) {
      updatedUsers[currentUser] = {
        ...currentUserData,
        username: newUsername || currentUserData.username,
        bio: newBio || currentUserData.bio,
        avatar: newAvatar || currentUserData.avatar
      };
      
      setUsers(updatedUsers);
      db.saveUsers(updatedUsers);
      return true;
    }
    
    return false;
  };

  const viewUserProfile = (userId) => {
    setViewingUserId(userId);
    setPage('profile');
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
      searchResults,
      isLoading,
      userLikes,
      viewingUserId,
      
      setCurrentUser,
      setPage,
      setActiveChat,
      searchContent,
      addPost,
      toggleLike,
      addComment,
      sendMessage,
      startChat,
      editProfile,
      viewUserProfile,
      setViewingUserId
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);