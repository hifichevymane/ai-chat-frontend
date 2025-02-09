import ThemeCard from "./components/ThemeCard";
import Input from "./components/Input";
import SendBtn from "./components/SendBtn";

import { useState } from "react";

function App() {
  const [isSendBtnActive, setIsSendBtnActive] = useState<boolean>(false);

  const onInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setIsSendBtnActive(!!target.value)
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-fit mx-auto">
        <h1 className="text-3xl text-center font-semibold font-secondary w-[401px] mb-6">
          Hi, I’m Mamaliga AI Chat Bot How can I help you?
        </h1>
        <h3 className="text-xl text-primary-500 mb-9">
          Discover and conquer new information with AI Bot!
        </h3>
        <div className="flex gap-8 mb-[168px]">
          <ThemeCard theme="Fun">Tell me a joke to impress the girl I like</ThemeCard>
          <ThemeCard theme="Work Assistant">Create an online chat website</ThemeCard>
          <ThemeCard theme="AI Teacher">What was the Newton’s third law?</ThemeCard>
        </div>
        <div className="flex justify-center w-full gap-2.5">
          <Input onInput={onInput} />
          <SendBtn isActive={isSendBtnActive} />
        </div>
      </div>
    </>
  )
}

export default App
