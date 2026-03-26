import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { I18nProvider, useI18n } from './I18nContext';

// Component to trigger language changes
const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <button onClick={() => setLanguage('vi')} data-testid="switch-vi">VI</button>
      <button onClick={() => setLanguage('en')} data-testid="switch-en">EN</button>
    </div>
  );
};

describe('HTML lang attribute sync', () => {
  beforeEach(() => {
    // Reset lang attribute and localStorage
    document.documentElement.lang = '';

    // Mock localStorage
    const store: Record<string, string> = {};
    const mockStorage = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    };
    Object.defineProperty(window, 'localStorage', { value: mockStorage, writable: true });
  });

  it('sets HTML lang attribute to vi by default', () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    expect(document.documentElement.lang).toBe('vi');
  });

  it('updates HTML lang attribute when language changes to en', async () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    expect(document.documentElement.lang).toBe('vi');

    await act(async () => {
      screen.getByTestId('switch-en').click();
    });

    expect(document.documentElement.lang).toBe('en');
  });

  it('updates HTML lang attribute when language changes back to vi', async () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    await act(async () => {
      screen.getByTestId('switch-en').click();
    });
    expect(document.documentElement.lang).toBe('en');

    await act(async () => {
      screen.getByTestId('switch-vi').click();
    });
    expect(document.documentElement.lang).toBe('vi');
  });

  it('lang attribute reflects current language state', async () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    // Verify sync between state and DOM
    expect(screen.getByTestId('current-lang').textContent).toBe('vi');
    expect(document.documentElement.lang).toBe('vi');

    await act(async () => {
      screen.getByTestId('switch-en').click();
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
