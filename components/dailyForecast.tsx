"use client";

import { getDailyWeatherState } from "@/lib/utils";
import DayCard from "./dayCard";

interface DailyForecastProps {
  isLoading: boolean;
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

function DailyForecast({ isLoading, daily }: DailyForecastProps) {
  const forecastData = getDailyWeatherState(
    daily?.time,
    daily?.weather_code,
    daily?.temperature_2m_min,
    daily?.temperature_2m_max
  );

  const emptyForcast = Array(7).fill({
    day: "",
    image_path: "",
    image_alt: "",
    temperature: null,
  });

  return (
    <div>
      <div className="mt-8">
        <h5 className="font-lg lg:text-xl font-semibold font-sans mb-3">
          Daily forecast
        </h5>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
          {(forecastData ?? emptyForcast).map((item, index) => (
            <div key={String(index + "--key")}>
              <DayCard isLoading={isLoading} day_forcast={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DailyForecast;
