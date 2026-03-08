import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountUp } from './useCountUp';

describe('useCountUp', () => {
  let rafCallbacks: Array<FrameRequestCallback>;
  let rafId: number;

  beforeEach(() => {
    rafCallbacks = [];
    rafId = 0;

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return ++rafId;
    });

    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 0 when trigger is false', () => {
    const { result } = renderHook(() => useCountUp(100, 1200, false));
    expect(result.current).toBe(0);
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it('calls requestAnimationFrame when trigger is true', () => {
    renderHook(() => useCountUp(100, 1200, true));
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('reaches exact target value when animation completes', () => {
    const { result } = renderHook(() => useCountUp(100, 1000, true));

    // Step through the rAF loop: first call sets start, subsequent calls advance
    // Drain all pending callbacks until completion
    act(() => {
      // First frame: sets start = 100, progress = 0
      const cb1 = rafCallbacks[rafCallbacks.length - 1];
      cb1(100);
    });

    act(() => {
      // Final frame: progress = (1100 - 100) / 1000 = 1.0
      const cb2 = rafCallbacks[rafCallbacks.length - 1];
      cb2(1100);
    });

    expect(result.current).toBe(100);
  });

  it('calls cancelAnimationFrame on unmount', () => {
    const { unmount } = renderHook(() => useCountUp(100, 1200, true));
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});
