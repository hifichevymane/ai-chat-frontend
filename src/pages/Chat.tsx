import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import MessagesContainer from "../components/MessagesContainer";
import Input from "../components/Input";
import SendBtn from "../components/SendBtn";
import Message from "../interfaces/Message";
import Sidebar from "../components/Sidebar";
import { api } from "../fetch";

export default function ChatPage() {
  const { id } = useParams();
  const context = useContext(GlobalContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>(context.inputValue);
  const [isSendBtnActive, setIsSendBtnActive] = useState<boolean>(false);

  useEffect(() => {
    setIsSendBtnActive(!!inputText.trim());
  }, [inputText]);

  useEffect(() => {
    const { newChatCreated } = context;
    if (!newChatCreated) return;

    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    context.inputValue = '';
    setInputText('');
    context.newChatCreated = false;

    const fetchChat = async () => {
      try {
        const stream = await api(`/chat/${id}/prompt`, {
          method: 'PATCH',
          body: { prompt: inputText },
          responseType: 'stream'
        });

        const llmMessage: Message = { text: '', isUser: false };
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
    };

    fetchChat();
  }, []);

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

      const stream = await api(`/chat/${id}/prompt`, {
        method: 'PATCH',
        body: { prompt: trimmedInputValue },
        responseType: 'stream'
      });
      const llmMessage: Message = { text: '', isUser: false };
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
