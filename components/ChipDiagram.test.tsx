import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import { ChipDiagram } from './ChipDiagram';

// --- Mocks ---

// Mock useCountUp to return target value immediately (hook is tested separately)
vi.mock('./hooks/useCountUp', () => ({
  useCountUp: (target: number) => target,
}));

// Mock useInView to be controllable
let inViewValue = false;
vi.mock('./hooks/useInView', () => ({
  useInView: () => inViewValue,
}));

// Mock useReducedMotion
vi.mock('./hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

beforeEach(() => {
  inViewValue = false;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ChipDiagram', () => {
  it('renders four distinct chip blocks with labels', () => {
    const { container } = render(<ChipDiagram />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();

    const textContent = svg!.textContent || '';
    expect(textContent).toContain('CPU');
    expect(textContent).toContain('GPU');
    expect(textContent).toContain('Neural Engine');
    expect(textContent).toContain('Memory');
  });

  it('renders spec values from chip data (M4 base defaults)', () => {
    const { container } = render(<ChipDiagram />);

    const svgText = container.querySelector('svg')!.textContent || '';
    // M4 base: 10 CPU, 10 GPU, 38 TOPS, 120 GB/s, 32GB
    expect(svgText).toContain('10');  // CPU or GPU cores
    expect(svgText).toContain('32');  // maxMemory GB
    expect(svgText).toContain('38');  // TOPS
    expect(svgText).toContain('120'); // bandwidth
  });

  it('updates specs when variant tab is clicked', () => {
    const { container, getByRole } = render(<ChipDiagram />);

    // Click M4 Max tab
    const maxTab = getByRole('tab', { name: /M4 Max/i });
    fireEvent.click(maxTab);

    const svgText = container.querySelector('svg')!.textContent || '';
    // First M4 Max found: 14 CPU (10P+4E), 32 GPU, 410 GB/s, 128GB
    expect(svgText).toContain('32');   // GPU cores
    expect(svgText).toContain('128');  // maxMemory
    expect(svgText).toContain('410');  // bandwidth
    expect(svgText).toContain('10P');  // performance cores
  });

  it('tab buttons have correct ARIA attributes', () => {
    const { getByRole, getAllByRole } = render(<ChipDiagram />);

    // tablist container
    const tablist = getByRole('tablist');
    expect(tablist).toBeTruthy();

    // 3 tab buttons
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    // First tab (M4 base) is selected by default
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('SVG has viewBox and responsive width', () => {
    const { container } = render(<ChipDiagram />);
    const svg = container.querySelector('svg');

    expect(svg).toBeTruthy();
    expect(svg!.getAttribute('viewBox')).toBe('0 0 400 300');
    expect(svg!.getAttribute('width')).toBe('100%');
  });

  it('SVG has accessible role and label', () => {
    const { container, getByRole } = render(<ChipDiagram />);
    const svg = container.querySelector('svg');

    expect(svg!.getAttribute('role')).toBe('img');
    expect(svg!.getAttribute('aria-label')).toContain('M4');

    // Label updates when variant changes
    const maxTab = getByRole('tab', { name: /M4 Max/i });
    fireEvent.click(maxTab);

    expect(svg!.getAttribute('aria-label')).toContain('M4 Max');
  });

  it('total DOM elements under 100', () => {
    const { container } = render(<ChipDiagram />);
    const allElements = container.querySelectorAll('*');
    expect(allElements.length).toBeLessThan(100);
  });
});
