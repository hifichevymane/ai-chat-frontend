import AccountSection from "./AccountSection";
import ChatList from "./ChatList";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";

import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";
import { ChatListItem } from "../interfaces/ChatListItem";
import { setUser } from "../store/user/user-slice";
import { RootState } from "../store";

interface TokenPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { chatId } = useParams({ strict: false });
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const user = useSelector((state: RootState) => state.user);

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

  const logout = async () => {
    await api('/auth/logout', {
      method: 'POST'
    });

    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(setUser({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    }));

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
      <AccountSection onAvatarClick={logout} user={user} />
    </aside>
  );
}
