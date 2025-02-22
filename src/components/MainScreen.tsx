import Input from "./Input";
import SendBtn from "./SendBtn";
import StartingChatMessage from "./StartingChatMessage";
import Message from "../interfaces/Message";
import MessagesContainer from "./MessagesContainer";

import { api } from "../fetch";
import { useState, useEffect } from "react";

export default function MainScreen() {
  const [isSendBtnActive, setIsSendBtnActive] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

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

    try {
      const trimmedInputValue = inputText.trim();
      setMessages(prev => [...prev, { text: trimmedInputValue, isUser: true }]);
      setInputText('');

      const stream = await api('/chat', {
        method: 'POST',
        body: { prompt: trimmedInputValue },
        responseType: 'stream'
      });
      const llmMessage: Message = { text: '', isUser: false };
      // llmMessageRef.current = llmMessage;
      setMessages(prev => [...prev, llmMessage]);

      const decoder = new TextDecoder();
      // @ts-expect-error Stream does implement the async iterable
      for await (const chunk of stream) {
        const decodedChunk = decoder.decode(chunk);
        llmMessage.text += decodedChunk;
        setMessages(prev => [...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col justify-center h-full w-full relative">
      {
        messages.length
          ? (
            <div className="h-full overflow-scroll mb-24">
              <MessagesContainer messages={messages} />
            </div>
          )
          : <StartingChatMessage />
      }
      <div className="flex justify-center w-full mb-4 absolute bottom-0" onKeyUp={onKeyUp}>
        <div className="flex justify-center w-[85%] gap-2.5 absolute bottom-0">
          <Input onInput={onInput} value={inputText} />
          <SendBtn isActive={isSendBtnActive} onClick={addMessage} />
        </div>
      </div>
    </div>
  )
}
