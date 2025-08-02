import Sidebar from "../components/Sidebar";
import StartingChatMessage from "../components/StartingChatMessage";
import Input from "../components/Input";
import SendBtn from "../components/SendBtn";

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

import { api } from "../fetch";
import { setIsNewChatCreated } from "../store/chat/chat-slice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState<string>('');

  const isSendBtnActive = !!inputText.trim();

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
      const message = inputText.trim();
      const { data: { id } } = await api.post<{ id: string }>('/chats');

      await api.post(`/chats/${id}/user-message`, { message });

      dispatch(setIsNewChatCreated(true));
      navigate({ to: '/$chatId', params: { chatId: id } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col justify-center h-full w-full relative">
        <StartingChatMessage />
        <div className="flex justify-center w-full mb-4 absolute bottom-0" onKeyUp={onKeyUp}>
          <div className="flex justify-center w-[85%] gap-2.5 absolute bottom-0">
            <Input onInput={onInput} value={inputText} />
            <SendBtn isActive={isSendBtnActive} onClick={addMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};
