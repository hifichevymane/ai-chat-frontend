import ThemeCard from "./components/ThemeCard";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl text-center font-semibold font-secondary w-[401px] pb-6">
          Hi, I’m Mamaliga AI Chat Bot How can I help you?
        </h1>
        <h3 className="text-xl text-primary-500 pb-9">
          Discover and conquer new information with AI Bot!
        </h3>
        <div className="flex gap-8">
          <ThemeCard theme="Fun">Tell me a joke to impress the girl I like</ThemeCard>
          <ThemeCard theme="Work Assistant">Create an online chat website</ThemeCard>
          <ThemeCard theme="AI Teacher">What was the Newton’s third law?</ThemeCard>
        </div>
      </div>
    </>
  )
}

export default App
