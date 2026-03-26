import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { I18nProvider, useI18n } from './I18nContext';

// Component to test persistence behavior
const LanguageDisplay: React.FC = () => {
  const { language, setLanguage } = useI18n();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <button onClick={() => setLanguage('vi')} data-testid="switch-vi">Switch VI</button>
      <button onClick={() => setLanguage('en')} data-testid="switch-en">Switch EN</button>
    </div>
  );
};

describe('localStorage persistence', () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    // Save original
    originalLocalStorage = window.localStorage;

    // Create mock
    const store: Record<string, string> = {};
    const mockStorage = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
      removeItem: vi.fn((key: string) => { delete store[key]; }),
      clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
      key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
      length: 0,
    };
    Object.defineProperty(window, 'localStorage', { value: mockStorage, writable: true });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage, writable: true });
  });

  it('saves language to localStorage on change', async () => {
    render(
      <I18nProvider>
        <LanguageDisplay />
      </I18nProvider>
    );

    // Initial save
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'vi');

    // Switch language
    await act(async () => {
      screen.getByTestId('switch-vi').click();
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'vi');
  });

  it('loads language from localStorage on mount', () => {
    // Pre-set localStorage
    (localStorage.getItem as any).mockReturnValueOnce('vi');

    render(
      <I18nProvider>
        <LanguageDisplay />
      </I18nProvider>
    );

    expect(screen.getByTestId('language').textContent).toBe('vi');
  });

  it('defaults to vi when no localStorage value', () => {
    (localStorage.getItem as any).mockReturnValueOnce(null);

    render(
      <I18nProvider>
        <LanguageDisplay />
      </I18nProvider>
    );

    expect(screen.getByTestId('language').textContent).toBe('vi');
  });

  it('handles invalid localStorage values gracefully', () => {
    (localStorage.getItem as any).mockReturnValueOnce('invalid-language');

    render(
      <I18nProvider>
        <LanguageDisplay />
      </I18nProvider>
    );

    // Should fallback to 'vi'
    expect(screen.getByTestId('language').textContent).toBe('vi');
  });
});
