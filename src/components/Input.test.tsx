import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input component', () => {
  it('renders with the given value', () => {
    render(<Input value="test value" />);
    const input = screen.getByPlaceholderText('e. g. Tell me the history of Ukraine...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test value');
  });

  it('calls onInput when input changes', () => {
    const handleInput = vi.fn();
    render(<Input value="" onInput={handleInput} />);
    const input = screen.getByPlaceholderText('e. g. Tell me the history of Ukraine...');
    fireEvent.input(input, { target: { value: 'new value' } });
    expect(handleInput).toHaveBeenCalled();
  });
});
