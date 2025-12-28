// src/utils/db.js
export const db = {
    // Текущий пользователь
    getCurrentUser: () => {
      const user = localStorage.getItem('bulbagr_current_user');
      return user || 'user1';
    },
    
    setCurrentUser: (userId) => {
      localStorage.setItem('bulbagr_current_user', userId);
    },
    
    // Пользователи
    getUsers: () => {
      const data = localStorage.getItem('bulbagr_users');
      if (data) return JSON.parse(data);
      
      const defaultUsers = {
        user1: {
          id: 'user1',
          username: 'bulba',
          name: 'Bulba',
          bio: 'Создатель BulbaGramm',
          avatar: null
        },
        user2: {
          id: 'user2',
          username: 'student',
          name: 'Студент',
          bio: 'Учусь программировать',
          avatar: null
        },
        user3: {
          id: 'user3',
          username: 'designer',
          name: 'Дизайнер',
          bio: 'Люблю красивые интерфейсы',
          avatar: null
        }
      };
      
      localStorage.setItem('bulbagr_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    },
    
    saveUsers: (users) => {
      localStorage.setItem('bulbagr_users', JSON.stringify(users));
    },
    
    // Посты
    getPosts: () => {
      const data = localStorage.getItem('bulbagr_posts');
      if (data) return JSON.parse(data);
      
      const defaultPosts = [
        {
          id: 'post1',
          authorId: 'user1',
          content: 'Привет! Это мой первый пост в BulbaGramm!',
          image: 'https://picsum.photos/seed/1/600/600',
          likes: 5,
          comments: [
            { text: 'Круто!', authorId: 'user2' },
            { text: 'Отлично!', authorId: 'user3' }
          ],
          createdAt: new Date().toISOString()
        },
        {
          id: 'post2',
          authorId: 'user2',
          content: 'Второй пост в моей ленте',
          image: 'https://picsum.photos/seed/2/600/600',
          likes: 3,
          comments: [
            { text: 'Нравится!', authorId: 'user1' }
          ],
          createdAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('bulbagr_posts', JSON.stringify(defaultPosts));
      return defaultPosts;
    },
    
    savePosts: (posts) => {
      localStorage.setItem('bulbagr_posts', JSON.stringify(posts));
    },
    
    // Чаты - ДОБАВЛЕНЫ ГОТОВЫЕ ЧАТЫ
    getChats: () => {
      const data = localStorage.getItem('bulbagr_chats');
      if (data) return JSON.parse(data);
      
      // Готовые чаты с сообщениями
      const defaultChats = [
        {
          id: 'chat1',
          participants: ['user1', 'user2'],
          messages: [
            { 
              id: 'msg1', 
              text: 'Привет! Как дела?', 
              senderId: 'user2', 
              timestamp: '10:30' 
            },
            { 
              id: 'msg2', 
              text: 'Здравствуй! Нормально, работаю над проектом', 
              senderId: 'user1', 
              timestamp: '10:32' 
            },
            { 
              id: 'msg3', 
              text: 'Круто! Что за проект?', 
              senderId: 'user2', 
              timestamp: '10:35' 
            }
          ],
          lastMessage: 'Круто! Что за проект?',
          lastTime: '10:35'
        },
        {
          id: 'chat2',
          participants: ['user1', 'user3'],
          messages: [
            { 
              id: 'msg4', 
              text: 'Хей! Посмотри новый дизайн интерфейса', 
              senderId: 'user3', 
              timestamp: '11:15' 
            },
            { 
              id: 'msg5', 
              text: 'Отлично выглядит! Где ты этому научился?', 
              senderId: 'user1', 
              timestamp: '11:17' 
            }
          ],
          lastMessage: 'Отлично выглядит! Где ты этому научился?',
          lastTime: '11:17'
        }
      ];
      
      localStorage.setItem('bulbagr_chats', JSON.stringify(defaultChats));
      return defaultChats;
    },
    
    saveChats: (chats) => {
      localStorage.setItem('bulbagr_chats', JSON.stringify(chats));
    },
    
    // Лайки пользователя
    getUserLikes: (userId) => {
      const data = localStorage.getItem(`bulbagr_likes_${userId}`);
      return data ? JSON.parse(data) : {};
    },
    
    saveUserLikes: (userId, likes) => {
      localStorage.setItem(`bulbagr_likes_${userId}`, JSON.stringify(likes));
    }
  };