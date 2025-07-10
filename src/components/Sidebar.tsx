import AccountSection from "./AccountSection";
import ChatList from "./ChatList";

import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";
import { ChatListItem } from "../interfaces/ChatListItem";
import { setUser } from "../store/user/user-slice";

interface TokenPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
}

const getChats = async () => {
  try {
    const chats = await api<ChatListItem[]>('/chats');
    return chats;
  } catch (err) {
    console.error(err);
  }
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { chatId } = useParams({ strict: false });

  const { data: chats = [] } = useQuery({
    queryKey: ['chats'],
    queryFn: getChats
  });

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return;
    const { sub: id, email, firstName, lastName } = jwtDecode<TokenPayload>(token);
    dispatch(setUser({
      id,
      email,
      firstName,
      lastName,
    }));
  }, [dispatch]);

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
      <AccountSection />
    </aside>
  );
}
