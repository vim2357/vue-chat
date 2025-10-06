<template>
  <div v-if="show" class="typing-indicator">
    <div class="typing-bubble">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
</script>

<style scoped>
.typing-indicator {
  display: flex;
  margin-bottom: 1rem;
}

.typing-bubble {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 0.25rem;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #9ca3af;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>