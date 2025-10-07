import type { ActionLog, Message } from '@/types/chat.ts'
import { ref, watch } from 'vue'

export const useActionLog = (messages: Message[]) => {
  const actionLog = ref<ActionLog[]>([])
  const maxLogSize = 50

  const addLogEntry = (action: string, details: string) => {
    const entry: ActionLog = {
      id: Date.now(),
      action, timestamp: new Date(), details
    }

    actionLog.value.unshift(entry)

    if (actionLog.value.length > maxLogSize) {
      actionLog.value = actionLog.value.slice(0, maxLogSize)
    }

    watch(() => messages, (newMessages, oldMessages) =>
    {
      if (oldMessages && oldMessages.length === newMessages.length) {
        const changed = newMessages.some((msg, index) => msg.text !== oldMessages[index]?.text)
        if (changed) {
          addLogEntry('message_edited', 'Сообщение было отредактировано')
        }
      }
    }, {deep: true})

    const clearLog = () => {
      actionLog.value = [];
      addLogEntry('log_cleared', 'История очищена')
    }

    return {
      actionLog, addLogEntry, clearLog
    }
  }
}