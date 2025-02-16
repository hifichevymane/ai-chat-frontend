type Props = {
  isActive?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function SendBtn({ isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-100 p-5 rounded-full transition-colors duration-150 ${isActive && 'bg-primary-600'}`}>
      <svg className={isActive ? 'text-primary-000 cursor-pointer' : 'text-primary-400'} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z" />
      </svg>
    </button>
  )
}
