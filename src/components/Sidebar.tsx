import AccountSection from "./AccountSection";
import ChatList from "./ChatList";
import { useNavigate, useParams } from "@tanstack/react-router";
import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";

export default function Sidebar() {
  const navigate = useNavigate();
  const { chatId = null } = useParams({ strict: false });

  const handleLogout = async () => {
    await api('/auth/logout', {
      method: 'POST'
    });
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate({ to: '/login' });
  };

  return (
    <aside className="h-screen w-1/4 bg-primary-100 p-6 flex flex-col">
      <ChatList activeChatId={chatId} />
      <AccountSection onAvatarClick={handleLogout} />
    </aside>
  );
}
