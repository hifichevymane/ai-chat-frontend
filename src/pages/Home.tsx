import Sidebar from "../components/Sidebar"
import MainScreen from "../components/MainScreen"

export default function HomePage() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <MainScreen />
    </div>
  )
};
