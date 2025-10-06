import { ref, reactive, computed, watch, watchEffect } from 'vue';
import type { Message, ChatState } from '../types/chat';

export function useChat() {
  // ref - для простых значений
  const messageText = ref<string>('');

  // reactive - для объектов
  const chatState = reactive<ChatState>({
    messages: [],
    currentUser: '',
    isTyping: false
  });

  // computed - производные значения
  const messageCount = computed(() => chatState.messages.length);
  const hasMessages = computed(() => chatState.messages.length > 0);
  const lastMessage = computed(() =>
    chatState.messages[chatState.messages.length - 1]
  );

  // Загрузка из localStorage при инициализации
  const loadFromStorage = () => {
    const saved = localStorage.getItem('vue-chat-messages');
    const savedUser = localStorage.getItem('vue-chat-user');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        chatState.messages = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch (e) {
        console.error('Error loading messages:', e);
      }
    }

    if (savedUser) {
      chatState.currentUser = savedUser;
    }
  };

  // watchEffect - автосохранение в localStorage
  watchEffect(() => {
    if (chatState.messages.length > 0) {
      localStorage.setItem('vue-chat-messages', JSON.stringify(chatState.messages));
    }
  });

  watchEffect(() => {
    if (chatState.currentUser) {
      localStorage.setItem('vue-chat-user', chatState.currentUser);
    }
  });

  // Отправка сообщения
  const sendMessage = () => {
    if (!messageText.value.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText.value,
      author: chatState.currentUser,
      timestamp: new Date(),
      isOwn: true
    };

    chatState.messages.push(newMessage);
    messageText.value = '';

    // Симуляция ответа бота
    setTimeout(() => {
      simulateBotResponse();
    }, 1000 + Math.random() * 2000);
  };

  // Симуляция ответа бота
  const simulateBotResponse = () => {
    const responses = [
      'Отличный вопрос! В Vue 3 это работает через Proxy.',
      'Composition API делает код более переиспользуемым!',
      'ref() и reactive() - основа реактивности Vue 3.',
      'TypeScript помогает отловить ошибки на этапе разработки.',
      'Watchers позволяют реагировать на изменения данных.',
      'Computed свойства автоматически пересчитываются!',
      'Composables - это переиспользуемые функции с реактивностью!',
    ];

    chatState.isTyping = true;

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now(),
        text: responses[Math.floor(Math.random() * responses.length)],
        author: 'Vue Bot',
        timestamp: new Date(),
        isOwn: false
      };

      chatState.messages.push(botMessage);
      chatState.isTyping = false;
    }, 1500);
  };

  // Очистка чата
  const clearChat = () => {
    chatState.messages = [];
    localStorage.removeItem('vue-chat-messages');
  };

  return {
    messageText,
    chatState,
    messageCount,
    hasMessages,
    lastMessage,
    sendMessage,
    clearChat,
    loadFromStorage
  };
}
