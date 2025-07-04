import AccountSection from "./AccountSection";
import ChatList from "./ChatList";

export default function Sidebar() {
  return (
    <aside className="h-screen w-1/4 bg-primary-100 p-6 flex flex-col">
      <ChatList />
      <AccountSection />
    </aside>
  );
}
