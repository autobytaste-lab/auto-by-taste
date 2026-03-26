import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { I18nProvider, useI18n } from './I18nContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('I18nContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    document.documentElement.lang = '';
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nProvider>{children}</I18nProvider>
  );

  it('provides language, setLanguage, and translations', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current.language).toBeDefined();
    expect(typeof result.current.setLanguage).toBe('function');
    expect(result.current.translations).toBeDefined();
  });

  it('defaults to Vietnamese language', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.language).toBe('vi');
  });

  it('translations resolve nested keys', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.translations.navbar.title).toBe('Auto By Taste');
  });

  it('setLanguage changes language state', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    act(() => {
      result.current.setLanguage('vi');
    });

    expect(result.current.language).toBe('vi');
  });

  it('translations change when language changes', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    const viOverview = result.current.translations.navbar.overview;

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.translations.navbar.overview).not.toBe(viOverview);
  });

  it('throws error when useI18n used outside provider', () => {
    expect(() => {
      renderHook(() => useI18n());
    }).toThrow('useI18n must be used within I18nProvider');
  });

  it('context value is memoized', () => {
    const { result, rerender } = renderHook(() => useI18n(), { wrapper });
    const firstTranslations = result.current.translations;

    rerender();

    expect(result.current.translations).toBe(firstTranslations);
  });
});
