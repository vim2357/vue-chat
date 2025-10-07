<template>
  <div class="app">
    <!-- Форма входа -->
    <div v-if="!chatState.currentUser" class="welcome-screen">
      <div class="welcome-card">
        <h1 class="title">Vue 3 Chat Demo</h1>
        <p class="subtitle">Composition API + TypeScript</p>

        <input
          v-model="username"
          @keypress.enter="startChat"
          type="text"
          placeholder="Введите ваше имя..."
          class="username-input"
        />

        <button @click="startChat" class="start-button">
          Начать чат
        </button>

        <div class="info-box">
          <strong>Демо показывает:</strong>
          <ul>
            <li>ref & reactive</li>
            <li>computed свойства</li>
            <li>watch & watchEffect</li>
            <li>TypeScript типизация</li>
            <li>Composables паттерн</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Чат -->
    <div v-else class="chat-container">
      <div class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div>
            <h2>Vue Chat Demo</h2>
            <p class="user-info">
              Пользователь: {{ chatState.currentUser }} •
              Сообщений: {{ messageCount }}
            </p>
          </div>
          <button @click="clearChat" class="clear-button">
            Очистить
          </button>
        </div>

        <!-- Messages -->
        <div ref="scrollContainer" class="messages-container">
          <div v-if="!hasMessages" class="empty-state">
            <p class="empty-title">Начните общение с Vue Bot!</p>
            <p class="empty-subtitle">
              Спросите что-нибудь о Vue 3, реактивности или TypeScript
            </p>
          </div>

          <ChatMessage
            v-for="message in chatState.messages"
            :key="message.id"
            :message="message"
            @add-reaction="addReaction"
          />

          <TypingIndicator :show="chatState.isTyping" />
        </div>

        <!-- Input -->
        <div class="input-container">
          <ChatInput
            @send="handleSend"
            @typing="handleTyping"
          />

          <div class="demo-info">
            <strong>Концепции Vue 3:</strong><br>
            • ref() - messageText |
            • reactive() - chatState |
            • computed - messageCount |
            • watch - автоскролл |
            • watchEffect - localStorage
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onBeforeUpdate } from 'vue';
import { useChat } from './composables/useChat';
import { useAutoScroll } from './composables/useAutoScroll';
import { useTypingIndicator } from './composables/useTypingIndicator';
import ChatMessage from './components/ChatMessage.vue';
import ChatInput from './components/ChatInput.vue';
import TypingIndicator from './components/TypingIndicator.vue';

// Использование composables
const {
  messageText,
  chatState,
  messageCount,
  hasMessages,
  sendMessage,
  clearChat,
  loadFromStorage,
  addReaction
} = useChat();

const { scrollContainer } = useAutoScroll(chatState.messages);
const { isUserTyping, handleTyping } = useTypingIndicator();

const username = ref('');

const startChat = () => {
  if (username.value.trim()) {
    chatState.currentUser = username.value.trim();
  }
};

const handleSend = (text: string) => {
  messageText.value = text;
  sendMessage();
};

// Загрузка данных при монтировании
onMounted(() => {
  loadFromStorage();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
}

.welcome-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.welcome-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
}

.username-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #d8b4fe;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.username-input:focus {
  border-color: #9333ea;
}

.start-button {
  width: 100%;
  padding: 0.75rem;
  background: #9333ea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.start-button:hover {
  background: #7e22ce;
}

.info-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #faf5ff;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.info-box ul {
  margin-top: 0.5rem;
  margin-left: 1.25rem;
}

.info-box li {
  margin-top: 0.25rem;
}

.chat-container {
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-window {
  width: 100%;
  max-width: 56rem;
  height: 90vh;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.chat-header {
  background: #9333ea;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h2 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.user-info {
  font-size: 0.875rem;
  opacity: 0.9;
}

.clear-button {
  padding: 0.5rem 1rem;
  background: #7e22ce;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.clear-button:hover {
  background: #6b21a8;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f9fafb;
}

.empty-state {
  text-align: center;
  margin-top: 3rem;
  color: #6b7280;
}

.empty-title {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.empty-subtitle {
  font-size: 0.875rem;
}

.input-container {
  background: white;
}

.demo-info {
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.5;
}
</style>