import MessageTemplateCard from "./MessageTemplateCard";
import Input from "./Input";
import SendBtn from "./SendBtn";

import { useState } from "react";

export default function MainScreen() {
  const [isSendBtnActive, setIsSendBtnActive] = useState<boolean>(false);

  const onInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setIsSendBtnActive(!!target.value.trim())
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-fit mx-auto">
      <h1 className="text-3xl text-center font-semibold font-secondary w-[401px] mb-6">
        Hi, I’m Mamaliga AI Chat Bot How can I help you?
      </h1>
      <h3 className="text-xl text-primary-500 mb-9">
        Discover and conquer new information with AI Bot!
      </h3>
      <div className="flex gap-8 mb-[168px]">
        <MessageTemplateCard theme="Fun">Tell me a joke to impress the girl I like</MessageTemplateCard>
        <MessageTemplateCard theme="Work Assistant">Create an online chat website</MessageTemplateCard>
        <MessageTemplateCard theme="AI Teacher">What was the Newton’s third law?</MessageTemplateCard>
      </div>
      <div className="flex justify-center w-full gap-2.5">
        <Input onInput={onInput} />
        <SendBtn isActive={isSendBtnActive} />
      </div>
    </div>
  )
}
