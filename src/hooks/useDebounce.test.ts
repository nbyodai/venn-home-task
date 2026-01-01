import { act, renderHook } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce hook", () =>{
  vi.useFakeTimers()

  it("returns initial values immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500))
    expect(result.current).toBe("hello")
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" }}
    );

    rerender({ value: "ab" });
    // not updated yet
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(500);
    })

    expect(result.current).toBe("ab")

  })

  it("cancels previous update on rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" }}
    );

    rerender({ value: "ab" });
    rerender({ value: "abc" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("abc");
  })
})
