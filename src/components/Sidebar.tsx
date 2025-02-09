import AccountSection from "./AccountSection"

export default function Sidebar() {
  return (
    <aside className="h-screen w-[320px] bg-primary-100 p-6 flex flex-col justify-between">
      <h4 className="font-secondary font-bold text-xl text-primary-600">
        Saved chats
      </h4>
      <h4 className="text-center font-secondary font-semibold text-xl text-black/45">
        No Saved Chats
      </h4>
      <AccountSection />
    </aside>
  )
}
