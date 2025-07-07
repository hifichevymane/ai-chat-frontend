import MessagesContainer from "../components/MessagesContainer";
import Input from "../components/Input";
import SendBtn from "../components/SendBtn";
import Message from "../interfaces/Message";
import Sidebar from "../components/Sidebar";

import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { api } from "../fetch";
import { RootState } from "../store";
import { setIsNewChatCreated } from "../store/chat/chat-slice";

export default function ChatPage() {
  const dispatch = useDispatch();
  const { chatId } = useParams({ from: '/$chatId' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSendBtnActive, setIsSendBtnActive] = useState<boolean>(false);
  const isNewChatCreated = useSelector((state: RootState) => state.chat.isNewChatCreated);

  const getChat = async () => {
    try {
      const { chatMessages }: { chatMessages: Message[] } = await api(`/chats/${chatId}`);
      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  const addUserMessage = async (message: string): Promise<void> => {
    try {
      setMessages(prev => [...prev, { content: message, role: 'user' }]);
      setInputText('');
      await api(`/chats/${chatId}/user-message`, { method: 'POST', body: { message } });
    } catch (err) {
      console.error(err);
    }
  };

  const addPrompt = async () => {
    try {
      const stream = await api(`/chats/${chatId}/generate-llm-response`, {
        method: 'POST',
        responseType: 'stream'
      });
      const llmMessage: Message = { content: '', role: 'assistant' };
      setMessages(prev => [...prev, llmMessage]);

      const decoder = new TextDecoder();
      // @ts-expect-error Stream does implement the async iterable
      for await (const chunk of stream) {
        const decodedChunk = decoder.decode(chunk);
        llmMessage.content += decodedChunk;
        setMessages(prev => [...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const retrieveChatInfo = async () => {
      if (!isNewChatCreated) {
        getChat();
      } else if (isNewChatCreated) {
        await getChat();
        await addPrompt();
        dispatch(setIsNewChatCreated(false));
      }
    };
    retrieveChatInfo();
  }, [chatId]);

  useEffect(() => {
    setIsSendBtnActive(!!inputText.trim());
  }, [inputText]);

  const onInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputText(target.value);
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key !== 'Enter') return;
    addMessage();
  };

  const addMessage = async () => {
    if (!isSendBtnActive) return;
    await addUserMessage(inputText.trim());
    await addPrompt();
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col justify-center h-full w-full relative">
        <div className="h-full overflow-scroll mb-24">
          <MessagesContainer messages={messages} />
        </div>
        <div className="flex justify-center w-full mb-4 absolute bottom-0" onKeyUp={onKeyUp}>
          <div className="flex justify-center w-[85%] gap-2.5 absolute bottom-0">
            <Input onInput={onInput} value={inputText} />
            <SendBtn isActive={isSendBtnActive} onClick={addMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
