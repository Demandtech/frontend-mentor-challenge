import { PlaceType} from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetPlaces(debouncedSearch: string) {
  return useQuery<PlaceType[], undefined>({
    queryKey: ["Locations", debouncedSearch],
    queryFn: async () => {
      const resp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedSearch}&count=10&language=en&format=json`,
        {
          method: "GET",
        }
      );

      const data = await resp.json();

      console.log(data);

      return data.results ?? [];
    },
    enabled: false,
  });
}
