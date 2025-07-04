interface Props {
  value: string,
  onInput?: React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({ onInput, value }: Props) {
  return (
    <input
      onInput={onInput}
      value={value}
      type="text"
      placeholder="e. g. Tell me the history of Ukraine..."
      className="bg-primary-100 w-full h-[70px] rounded-[41px] pl-[31px] font-primary outline-0"
    />
  );
}
