<template>
  <div class="chat-input">
    <input
      v-model="inputValue"
      @keypress.enter="handleSend"
      @input="onInput"
      type="text"
      placeholder="Напишите сообщение..."
      class="input-field"
    />
    <button @click="handleSend" class="send-button">
      Отправить
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// defineEmits с TypeScript
const emit = defineEmits<{
  send: [text: string];
  typing: [];
}>();

const inputValue = ref('');

const handleSend = () => {
  if (inputValue.value.trim()) {
    emit('send', inputValue.value);
    inputValue.value = '';
  }
};

const onInput = () => {
  emit('typing');
};
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.input-field {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #d8b4fe;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
}

.input-field:focus {
  border-color: #9333ea;
}

.send-button {
  padding: 0.75rem 1.5rem;
  background: #9333ea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.send-button:hover {
  background: #7e22ce;
}
</style>
