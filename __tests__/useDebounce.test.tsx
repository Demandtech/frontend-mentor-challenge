import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should update value only after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "first" } }
    );

    expect(result.current).toBe("first");

    rerender({ value: "second" });

    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("second");
  });
});
