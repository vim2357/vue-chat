import { ref, watch, nextTick } from 'vue';

export function useAutoScroll(trigger: any) {
  const scrollContainer = ref<HTMLElement | null>(null);

  // watch - следим за изменениями и скроллим
  watch(
    () => trigger.value,
    async () => {
      await nextTick();
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
      }
    },
    { deep: true }
  );

  return {
    scrollContainer
  };
}