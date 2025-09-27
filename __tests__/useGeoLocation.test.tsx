import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetPlaces } from "@/hooks/useGeoLoaction";

const createWrapper = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

describe("useGetPlaces", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("returns places when API responds", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 1, name: "Lagos" }],
      }),
    });

    const { result } = renderHook(() => useGetPlaces("lagos"), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(result.current.data).toEqual([{ id: 1, name: "Lagos" }])
    );
  });

  it("returns empty array when results missing", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useGetPlaces("unknown"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toEqual([]));
  });
});
