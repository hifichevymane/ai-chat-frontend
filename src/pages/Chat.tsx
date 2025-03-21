import { useParams } from "react-router";
import { useContext, useEffect, useState, useRef } from "react";
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
  const renderAfterCalled = useRef(false);

  const getChat = async () => {
    try {
      const { context }: { context: Message[] } = await api(`/chats/${id}`);
      setMessages(context);
    } catch (err) {
      console.error(err);
    }
  }

  const addPrompt = async () => {
    try {
      const trimmedInputValue = inputText.trim();
      setMessages(prev => [...prev, { content: trimmedInputValue, role: 'user' }]);
      // console.log('added message:',{ content: trimmedInputValue, role: 'user' });
      context.inputValue = '';
      setInputText('');

      const stream = await api(`/chats/${id}/prompt`, {
        method: 'PATCH',
        body: { prompt: trimmedInputValue },
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
  }

  useEffect(() => {
    if (!renderAfterCalled.current && !context.newChatCreated) {
      getChat();
    } else if (context.newChatCreated) {
      addPrompt();
      context.newChatCreated = false;
    }
    renderAfterCalled.current = true;
  }, []);

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

  const addMessage = () => {
    if (!isSendBtnActive) return;
    addPrompt();
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
