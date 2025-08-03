interface Props {
  id: string;
  title: string;
  active: boolean;
  onClick: (id: string) => void;
}

export default function ChatTab({ id, title, active, onClick }: Props) {
  const onBtnClick = () => onClick(id);

  return (
    <button onClick={onBtnClick} className={`w-full h-fit flex rounded-full ${active ? 'bg-primary-300' : 'bg-primary-200'} text-primary-500 py-4 pl-8 items-center gap-3.5 text-sm cursor-pointer`}>
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10 7l-.516 1.394c-.676 1.828-1.014 2.742-1.681 3.409s-1.581 1.005-3.409 1.681L3 14l1.394.516c1.828.676 2.742 1.015 3.409 1.681s1.005 1.581 1.681 3.409L10 21l.516-1.394c.676-1.828 1.015-2.742 1.681-3.409s1.581-1.005 3.409-1.681L17 14l-1.394-.516c-1.828-.676-2.742-1.014-3.409-1.681s-1.005-1.581-1.681-3.409zm8-4l-.221.597c-.29.784-.435 1.176-.72 1.461c-.286.286-.678.431-1.462.72L15 6l.598.221c.783.29 1.175.435 1.46.72c.286.286.431.678.72 1.462L18 9l.221-.597c.29-.784.435-1.176.72-1.461c.286-.286.678-.431 1.462-.72L21 6l-.598-.221c-.783-.29-1.175-.435-1.46-.72c-.286-.286-.431-.678-.72-1.462z" color="currentColor"></path>
      </svg>
      <span className={active ? 'font-bold' : ''}>{title}</span>
    </button>
  );
}
