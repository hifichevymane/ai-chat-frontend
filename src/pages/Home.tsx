import Sidebar from "../components/Sidebar"
import StartingChatMessage from "../components/StartingChatMessage";
import Input from "../components/Input";
import SendBtn from "../components/SendBtn";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { GlobalContext } from "../context";

import { api } from "../fetch";

export default function HomePage() {
  const [isSendBtnActive, setIsSendBtnActive] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const context = useContext(GlobalContext);
  const navigate = useNavigate();

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
      context.inputValue = trimmedInputValue;
      const { id } = await api('/chat', { method: 'POST' });
      context.newChatCreated = true;
      navigate(`/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

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
  )
};
