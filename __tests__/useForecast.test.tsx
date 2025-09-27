// useForecast.test.tsx
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForecast } from "@/hooks/useForecast";
import { AppProvider } from "@/components/context/AppContext";

const createWrapper = () => {
  const client = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>
      <AppProvider>{children}</AppProvider>
    </QueryClientProvider>
  );
};

describe("useForecast", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("fetches forecast successfully with name from reverse geocode", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: {},
      }),
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        city: "Lagos",
        countryName: "Nigeria",
      }),
    });

    const { result } = renderHook(() => useForecast(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(false);
      expect(result.current.data?.current?.name).toBe("Lagos, Nigeria");
    });
  });

  it("handles forecast API error gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useForecast(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => result.current.data === undefined);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
