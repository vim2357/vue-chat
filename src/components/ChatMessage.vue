<template>
  <div :class="['message', { 'message-own': message.isOwn }]">
    <div :class="['message-bubble', { 'bubble-own': message.isOwn }]">
      <div class="message-header">
        <span class="message-author">{{ message.author }}</span>
        <span class="message-time">
          {{ formatTime(message.timestamp) }}
        </span>
      </div>
      <p class="message-text">{{ message.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types/chat';

// defineProps с TypeScript
const props = defineProps<{
  message: Message;
}>();

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.message {
  display: flex;
  margin-bottom: 1rem;
}

.message-own {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
}

.bubble-own {
  background: #9333ea;
  color: white;
  border: none;
}

.message-header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.8;
}

.message-author {
  font-weight: 600;
}

.message-text {
  font-size: 0.875rem;
  margin: 0;
}
</style>
