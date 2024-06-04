import { ref } from 'vue';

import type { ChatMessage } from '@/interfaces/chat-message.interface';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);

  const onMessage = (text: string) => {
    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text,
    });
  };

  return { messages, onMessage };
};
