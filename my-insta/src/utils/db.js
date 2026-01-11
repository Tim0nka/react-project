// Очищаем старые данные при загрузке приложения
if (localStorage.getItem('bulbagr_cleanup') !== 'done') {
  // Удаляем все старые ключи
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('bulbagr_')) {
      localStorage.removeItem(key);
    }
  });
  localStorage.setItem('bulbagr_cleanup', 'done');
  console.log('✅ Старые данные очищены');
}

export const db = {
  getCurrentUser: () => {
    const user = localStorage.getItem('bulbagr_current_user');
    return user || 'bulba';
  },
  
  setCurrentUser: (userId) => {
    localStorage.setItem('bulbagr_current_user', userId);
  },
  
  getUsers: () => {
    const data = localStorage.getItem('bulbagr_users');
    if (data) return JSON.parse(data);
    
    const defaultUsers = {
      bulba: {
        id: 'bulba',
        username: 'Bulba',
        name: 'Bulba',
        bio: 'Создатель BulbaGramm',
        avatar: null,
        followers: ['user1', 'user2'],
        following: ['user1', 'user2']
      },
      user1: {
        id: 'user1',
        username: 'user1',
        name: 'Пользователь 1',
        bio: 'Обычный пользователь',
        avatar: null,
        followers: ['bulba'],
        following: ['bulba']
      },
      user2: {
        id: 'user2',
        username: 'user2',
        name: 'Пользователь 2',
        bio: 'Еще один пользователь',
        avatar: null,
        followers: ['bulba'],
        following: ['bulba']
      }
    };
    
    localStorage.setItem('bulbagr_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  },
  
  saveUsers: (users) => {
    localStorage.setItem('bulbagr_users', JSON.stringify(users));
  },
  
  getPosts: () => {
    const data = localStorage.getItem('bulbagr_posts');
    if (data) return JSON.parse(data);
    
    const defaultPosts = [
      {
        id: 'post1',
        authorId: 'bulba',
        content: 'Привет! Это мой первый пост в BulbaGramm!',
        image: null,
        likes: 5,
        likedBy: ['user1', 'user2'],
        comments: [
          { id: 'com1', text: 'Круто!', authorId: 'user1', timestamp: '10:30' },
          { id: 'com2', text: 'Отлично!', authorId: 'user2', timestamp: '10:35' }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'post2',
        authorId: 'user1',
        content: 'Второй пост в моей ленте',
        image: null,
        likes: 3,
        likedBy: ['bulba'],
        comments: [
          { id: 'com3', text: 'Нравится!', authorId: 'bulba', timestamp: '11:15' }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'post3',
        authorId: 'user2',
        content: 'Дизайн нового интерфейса',
        image: null,
        likes: 8,
        likedBy: ['bulba', 'user1'],
        comments: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'post4',
        authorId: 'bulba',
        content: 'Рабочий день. Пишу код для учебного проекта',
        image: null,
        likes: 2,
        likedBy: ['user1'],
        comments: [
          { id: 'com4', text: 'Удачи!', authorId: 'user2', timestamp: '14:22' }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'post5',
        authorId: 'user1',
        content: 'Тестирую новый функционал',
        image: null,
        likes: 1,
        likedBy: ['bulba'],
        comments: [
          { id: 'com5', text: 'Отлично работает!', authorId: 'user2', timestamp: '15:45' }
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
  
  getChats: () => {
    const data = localStorage.getItem('bulbagr_chats');
    if (data) return JSON.parse(data);
    
    const defaultChats = [
      {
        id: 'chat1',
        participants: ['bulba', 'user1'],
        messages: [
          { id: 'msg1', text: 'Привет! Как дела?', senderId: 'user1', timestamp: '10:30' },
          { id: 'msg2', text: 'Здравствуй! Нормально, работаю над проектом', senderId: 'bulba', timestamp: '10:32' },
          { id: 'msg3', text: 'Круто! Что за проект?', senderId: 'user1', timestamp: '10:35' }
        ],
        lastMessage: 'Круто! Что за проект?',
        lastTime: '10:35'
      },
      {
        id: 'chat2',
        participants: ['bulba', 'user2'],
        messages: [
          { id: 'msg4', text: 'Хей! Посмотри новый дизайн интерфейса', senderId: 'user2', timestamp: '11:15' },
          { id: 'msg5', text: 'Отлично выглядит! Где ты этому научился?', senderId: 'bulba', timestamp: '11:17' }
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
  
  getUserLikes: (userId) => {
    const data = localStorage.getItem(`bulbagr_likes_${userId}`);
    return data ? JSON.parse(data) : {};
  },
  
  saveUserLikes: (userId, likes) => {
    localStorage.setItem(`bulbagr_likes_${userId}`, JSON.stringify(likes));
  }
};