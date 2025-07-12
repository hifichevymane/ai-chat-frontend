import AccountSection from "./AccountSection";
import ChatList from "./ChatList";

import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { api } from "../fetch";
import { ChatListItem } from "../interfaces/ChatListItem";

export default function Sidebar() {
  const navigate = useNavigate();

  const { chatId } = useParams({ strict: false });

  const { data: chats = [] } = useQuery<ChatListItem[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const chats = await api<ChatListItem[]>('/chats');
      return chats;
    }
  });

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
