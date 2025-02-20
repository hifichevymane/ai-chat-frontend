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
    setIsSendBtnActive(!!inputText);
  }, [inputText]);

  const onInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputText(target.value.trim());
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key !== 'Enter') return;
    addMessage();
  };

  const addMessage = async () => {
    if (!isSendBtnActive) return;

    setMessages(prevMessages => [...prevMessages, { text: inputText, isUser: true }]);
    setInputText('');

    try {
      const { message }: { message: string } = await api('/chat', {
        method: 'POST',
        body: { prompt: inputText },
      });
      console.log(message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col justify-center w-full items-center py-8">
      <div className="flex flex-col justify-between items-center h-full w-full">
        <div className="flex flex-col items-center grow w-full overflow-scroll">
          {
            messages.length
              ? <MessagesContainer messages={messages} />
              : <StartingChatMessage />
          }
        </div>
      </div>
      <div className="flex justify-center w-[60%] gap-2.5 absolute bottom-8" onKeyUp={onKeyUp}>
        <Input onInput={onInput} value={inputText} />
        <SendBtn isActive={isSendBtnActive} onClick={addMessage} />
      </div>
    </div>
  )
}
