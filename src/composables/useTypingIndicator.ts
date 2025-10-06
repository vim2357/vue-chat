import { ref } from 'vue';

export function useTypingIndicator() {
  const isUserTyping = ref(false);
  let typingTimeout: number | null = null;

  const handleTyping = () => {
    isUserTyping.value = true;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    typingTimeout = setTimeout(() => {
      isUserTyping.value = false;
    }, 1000);
  };

  return {
    isUserTyping,
    handleTyping
  };
}
