import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInView } from './useInView';

let observerCallback: IntersectionObserverCallback;
let mockObserverInstance: {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
  mockObserverInstance = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };

  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(function (this: unknown, callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return mockObserverInstance;
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

function triggerIntersection(isIntersecting: boolean) {
  observerCallback(
    [{ isIntersecting } as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}

describe('useInView', () => {
  it('returns false initially', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useInView(ref));
    expect(result.current).toBe(false);
  });

  it('returns true after element enters viewport', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useInView(ref));

    act(() => {
      triggerIntersection(true);
    });

    expect(result.current).toBe(true);
  });

  it('disconnects observer after first intersection (one-shot)', () => {
    const ref = { current: document.createElement('div') };
    renderHook(() => useInView(ref));

    act(() => {
      triggerIntersection(true);
    });

    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });

  it('disconnects observer on unmount', () => {
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useInView(ref));

    unmount();

    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });
});
