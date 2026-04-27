import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ExampleCard } from './component-template';

describe('ExampleCard', () => {
  it('renders the title and description', () => {
    render(<ExampleCard title="Account" description="Manage your settings" />);

    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByText('Manage your settings')).toBeInTheDocument();
  });

  it('supports user interactions through visible controls', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <ExampleCard
        title="Account"
        actions={<button onClick={onClick}>Save changes</button>}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});