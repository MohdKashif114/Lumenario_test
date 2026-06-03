import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DecisionBadge from './DecisionBadge';

describe('DecisionBadge Component', () => {
  it('renders correctly for publish status', () => {
    
    render(<DecisionBadge decision="publish" />);
    
    const badgeElement = screen.getByText('Ready to Publish');
    
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('text-emerald-600');
  });
});
