import { PlaceType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetPlaces(querySearch: string) {
  return useQuery<PlaceType[], undefined>({
    queryKey: ["Locations", querySearch],
    queryFn: async () => {
      const resp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${querySearch}&count=10&language=en&format=json`,
        {
          method: "GET",
        }
      );

      const data = await resp.json();

      return data.results ?? [];
    },
    enabled: !!querySearch,
  });
}
