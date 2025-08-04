import { useDispatch } from "react-redux";
import { setSelectedPromptCard } from "../store/chat/chat-slice";

import MessageTemplateCard from "./MessageTemplateCard";

export default function StartingChatMessage() {
  const dispatch = useDispatch();

  const handleClick = (prompt: string) => {
    dispatch(setSelectedPromptCard(prompt));
  };

  return (
    <div className="flex flex-col items-center my-auto">
      <h1 className="text-3xl text-center font-semibold font-secondary w-[401px] mb-6">
        Hi, I’m Mamaliga AI Chat Bot How can I help you?
      </h1>
      <h3 className="text-xl text-primary-500 mb-9">
        Discover and conquer new information with AI Bot!
      </h3>
      <div className="flex gap-8">
        <MessageTemplateCard onClick={handleClick} theme="Fun">Tell me a joke to impress the girl I like</MessageTemplateCard>
        <MessageTemplateCard onClick={handleClick} theme="Work Assistant">Create an online chat website</MessageTemplateCard>
        <MessageTemplateCard onClick={handleClick} theme="AI Teacher">What was the Newton’s third law?</MessageTemplateCard>
      </div>
    </div>
  );
}
