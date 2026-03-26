import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { Hero } from './Hero';
import { en } from '../i18n/translations/en';

// --- Mocks ---

// Mock ChipDiagram at module level
vi.mock('./ChipDiagram', () => ({
  ChipDiagram: (props: any) => <div data-testid="chip-diagram" className={props.className} />,
}));

// Mock useI18n to return English translations
vi.mock('../i18n/I18nContext', () => ({
  useI18n: () => ({
    translations: en,
    language: 'en',
    setLanguage: () => {},
  }),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Hero', () => {
  // HERO-01: Headline with OpenClaw services messaging
  it('renders headline with OpenClaw services messaging', () => {
    const { container } = render(<Hero />);
    const h1 = container.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1!.textContent).toContain('OpenClaw Services');
    expect(h1!.textContent).toContain('Tailored For You.');
  });

  // HERO-02: Subtitle with OpenClaw service description
  it('renders subtitle about OpenClaw services', () => {
    const { getByText } = render(<Hero />);
    const subtitle = getByText(/Installation, performance optimization/i);
    expect(subtitle).toBeTruthy();
    expect(subtitle.tagName.toLowerCase()).toBe('p');
  });

  // HERO-03: Two CTA buttons with correct links
  it('renders two CTA buttons with correct hrefs', () => {
    const { container } = render(<Hero />);
    const pricingLink = container.querySelector('a[href="#pricing"]');
    expect(pricingLink).toBeTruthy();
    expect(pricingLink!.textContent).toContain('View pricing');

    const zaloLink = container.querySelector('a[href*="zalo.me"]');
    expect(zaloLink).toBeTruthy();
    expect(zaloLink!.textContent).toContain('Free consultation');
  });

  // HERO-04: Service highlight badges
  it('renders service highlight badges', () => {
    const { container } = render(<Hero />);
    const text = container.textContent || '';

    expect(text).toContain('OpenClaw Setup');
    expect(text).toContain('Performance Tuning');
    expect(text).toContain('Personal Consulting');
    expect(text).toContain('Custom AI Agent');
  });

  // HERO-05: ChipDiagram component renders
  it('renders ChipDiagram component', () => {
    const { getByTestId } = render(<Hero />);
    const chipDiagram = getByTestId('chip-diagram');
    expect(chipDiagram).toBeTruthy();
  });

  // Negative: Old elements removed
  it('does not render old Agent Layer or Sales Agent content', () => {
    const { container } = render(<Hero />);
    const text = container.textContent || '';
    expect(text).not.toContain('AI Agent Layer');
    expect(text).not.toContain('Sales Agent');
  });
});
