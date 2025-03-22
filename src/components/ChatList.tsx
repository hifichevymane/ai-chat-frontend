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

  return (
    <>
      <h4 className="font-secondary font-bold text-xl text-primary-600">
        Saved chats
      </h4>
      {
        !chats.length
          ? (
            <h4 className="text-center font-secondary font-semibold text-xl text-black/45">
              No Saved Chats
            </h4>
          )
          : (
            <div className="flex flex-col gap-5 my-11 overflow-scroll">
              {chats.map(({ id, title }) => (
                <ChatTab key={id} id={id} title={title} active={params.id === id} onClick={onChatClick} />
              ))}
            </div>
          )
      }
    </>
  )
}
