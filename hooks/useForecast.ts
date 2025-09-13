import { useApp } from "@/components/context/AppContext";
import { useQuery } from "@tanstack/react-query";

export function useForecast() {
  const { state, setSearchQuery, setIsLoading, setIsError } = useApp();

  const { data, refetch, isError } = useQuery({
    queryKey: ["Forecast", state],
    queryFn: async () => {
      setIsLoading(true);
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${state.latitude}&longitude=${state.longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=weather_code,temperature_2m&current=temperature_2m,wind_speed_10m,precipitation,weather_code,relative_humidity_2m&wind_speed_unit=${state.wind}&temperature_unit=${state.temperature}&precipitation_unit=${state.precipitation}`,
        {
          method: "GET",
        }
      );

      if (!forecastResponse.ok) return;

      let forecastData = await forecastResponse.json();

      if (!forecastData.name) {
        const nameResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${state.latitude}&longitude=${state.longitude}&localityLanguage=en`
        );

        if (!nameResponse.ok) return;

        const nameData = await nameResponse.json();

        forecastData.current.name =
          nameData.city + ", " + nameData?.countryName;
      }
      setSearchQuery("");
      setIsLoading(false);
      // return null;
      return forecastData;
    },

    enabled: !!state.latitude && !!state.longitude,
  });

  if (isError) {
    setIsLoading(false);
    setIsError(true);
  }

  return { data, refetch, isError };
}
