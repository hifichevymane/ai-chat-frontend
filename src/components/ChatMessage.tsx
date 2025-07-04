import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Message from "../interfaces/Message";

export default function ChatMessage({ role, content }: Message) {
  if (role !== 'user') {
    return (
      <article className='[&_h1]:font-bold [&_h1]:text-2xl [&_a]:underline [&_a]:font-semibold [&_a]:text-blue-500 flex flex-col gap-4 w-fit max-w-4/5 p-4 bg-primary-100 rounded-t-xl rounded-br-xl'>
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </article>
    );
  }

  return (
    <div className='flex flex-col gap-4 w-fit max-w-4/5 p-4 bg-primary-100 rounded-t-xl rounded-bl-xl'>
      {content}
    </div>
  );
}
