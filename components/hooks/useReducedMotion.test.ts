import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

function mockReducedMotion(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const removeEventListener = vi.fn();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addEventListener: (_event: string, handler: (e: MediaQueryListEvent) => void) => {
        listeners.push(handler);
      },
      removeEventListener,
      dispatchEvent: vi.fn(),
    })),
  });

  return {
    toggle: (newValue: boolean) => {
      listeners.forEach(fn => fn({ matches: newValue } as MediaQueryListEvent));
    },
    removeEventListener,
  };
}

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when prefers-reduced-motion is not active', () => {
    mockReducedMotion(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion is active', () => {
    mockReducedMotion(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates reactively when OS setting changes', () => {
    const mock = mockReducedMotion(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      mock.toggle(true);
    });
    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const mock = mockReducedMotion(false);
    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    expect(mock.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
