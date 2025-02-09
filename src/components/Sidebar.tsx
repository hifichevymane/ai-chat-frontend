import AccountSection from "./AccountSection"

export default function Sidebar() {
  return (
    <aside className="h-screen w-[320px] bg-primary-100 p-6 flex flex-col justify-between">
      <h4 className="font-secondary font-bold text-xl text-primary-600">Saved chats</h4>
      <AccountSection />
    </aside>
  )
}
