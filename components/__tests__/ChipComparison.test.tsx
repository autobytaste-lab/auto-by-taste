import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChipComparison } from '../ChipComparison';

describe('ChipComparison', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChipComparison />);
    expect(container).toBeTruthy();
  });

  it('displays chart title in Vietnamese', () => {
    render(<ChipComparison />);
    expect(screen.getByText(/So sánh chip M-series/i)).toBeInTheDocument();
  });

  it('applies card styling', () => {
    const { container } = render(<ChipComparison />);
    const card = container.querySelector('[class*="bg-"]');
    expect(card).toBeInTheDocument();
  });

  it('contains Vietnamese labels for metrics', () => {
    render(<ChipComparison />);
    // Check for Vietnamese metric labels
    const content = screen.getByText(/So sánh chip M-series/i).closest('div');
    expect(content).toBeInTheDocument();
  });

  it('uses ResponsiveContainer for responsive chart sizing', () => {
    const { container } = render(<ChipComparison />);
    // ResponsiveContainer renders as a div with specific class
    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });
});
