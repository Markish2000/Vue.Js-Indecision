import { ref } from 'vue';

import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);

  const getHerResponse = async () => {
    const url = 'https://yesno.wtf/api';
    const response = await fetch(url);
    const data = (await response.json()) as YesNoResponse;

    return data;
  };

  const onMessage = async (text: string) => {
    if (text.length > 0) {
      messages.value.push({
        id: new Date().getTime(),
        itsMine: true,
        message: text,
      });

      if (text.endsWith('?')) {
        const { answer, image } = await getHerResponse();

        messages.value.push({
          id: new Date().getTime(),
          image,
          itsMine: false,
          message: answer,
        });
      }
    }
  };

  return { messages, onMessage };
};
