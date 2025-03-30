import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../fetch";

import ChatTab from "./ChatTab";

interface Chat {
  id: string;
  title: string;
}

export default function ChatList() {
  const params = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats: Chat[] = await api('/chats');
        setChats(chats);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, []);

  const onChatClick = (id: string) => navigate(`/${id}`);
  const onCreateNewChatBtnClick = () => navigate('/');

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="font-secondary font-bold text-xl text-primary-600">
          Saved chats
        </h4>
        <button className="text-primary-600 cursor-pointer" title="Create new chat" onClick={onCreateNewChatBtnClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width={31} height={31} viewBox="0 0 24 24">
            <path fill="currentColor" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"></path>
          </svg>
        </button>
      </div>
      {
        !chats.length
          ? (
            <div className="h-full flex justify-center items-center">
              <h4 className="flex text-center font-secondary font-semibold text-xl text-black/45">
                No Saved Chats
              </h4>
            </div>
          )
          : (
            <div className="flex flex-col gap-5 my-11 overflow-scroll h-full">
              {chats.map(({ id, title }) => (
                <ChatTab key={id} id={id} title={title} active={params.id === id} onClick={onChatClick} />
              ))}
            </div>
          )
      }
    </>
  )
}
