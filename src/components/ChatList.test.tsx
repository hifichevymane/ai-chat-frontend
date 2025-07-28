import { render, screen } from '@testing-library/react';
import ChatList from './ChatList';
import { describe, it, expect } from 'vitest';
import { ChatListItem } from '../interfaces/ChatListItem';

describe('ChatList component', () => {
  it('renders empty state', () => {
    render(<ChatList chats={[]} onChatClick={() => { }} onCreateNewChatBtnClick={() => { }} />);
    expect(screen.getByText('No Saved Chats')).toBeInTheDocument();
  });

  it('renders with the given chats', () => {
    const chats: ChatListItem[] = [
      { id: '1', title: 'Chat 1' },
      { id: '2', title: 'Chat 2' },
      { id: '3', title: 'Chat 3' },
    ];

    render(<ChatList chats={chats} onChatClick={() => { }} onCreateNewChatBtnClick={() => { }} />);

    expect(screen.getByText('Chat 1')).toBeInTheDocument();
    expect(screen.getByText('Chat 2')).toBeInTheDocument();
    expect(screen.getByText('Chat 3')).toBeInTheDocument();
  });
});
