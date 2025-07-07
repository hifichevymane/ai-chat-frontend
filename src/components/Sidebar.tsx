import AccountSection from "./AccountSection";
import ChatList from "./ChatList";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";
import { ChatListItem } from "../interfaces/ChatListItem";

export default function Sidebar() {
  const navigate = useNavigate();
  const { chatId } = useParams({ strict: false });
  const [chats, setChats] = useState<ChatListItem[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats: ChatListItem[] = await api('/chats');
        setChats(chats);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, []);

  const logout = async () => {
    await api('/auth/logout', {
      method: 'POST'
    });
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate({ to: '/login' });
  };

  const navigateToChat = (id: string) => navigate({ to: '/$chatId', params: { chatId: id } });
  const navigateToHome = () => navigate({ to: '/' });

  return (
    <aside className="h-screen w-1/4 bg-primary-100 p-6 flex flex-col">
      <ChatList
        chats={chats}
        activeChatId={chatId}
        onChatClick={navigateToChat}
        onCreateNewChatBtnClick={navigateToHome}
      />
      <AccountSection onAvatarClick={logout} />
    </aside>
  );
}
