import { formatDate, getWeatherImagePath } from "@/lib/utils";
import { Card, CardBody } from "@heroui/card";
import React from "react";
import CurrentForecastLoader from "./currentForecastloader";
import { CurrentType } from "@/types";
import { useApp } from "./context/AppContext";
import { Image } from "@heroui/image";
import NextImage from "next/image";

function CurrentForecast({
  isLoading = true,
  current,
}: {
  isLoading: boolean;
  current: CurrentType;
}) {
  const { state } = useApp();

  return (
    <div>
      {isLoading ? (
        <CurrentForecastLoader />
      ) : (
        <Card
          radius="lg"
          className="dark bg-background w-full h-full max-h-[264px] relative overflow-hidden"
        >
          <Image
            height={264}
            width="100%"
            alt=""
            role="presentation"
            src="/assets/images/bg-today-large.svg"
            className="dark h-full w-full object-cover"
            srcSet="/assets/images/bg-today-small.svg 600w, /assets/images/bg-today-large.svg 1200w"
          />
          <CardBody className="px-5 items-center flex-row z-10 absolute top-1/2 -translate-y-1/2">
            <div className="my-auto flex w-full justify-between items-center flex-col md:flex-row gap-5">
              <div className="text-center md:text-start md:max-w-1/2">
                <h2 className="font-semibold text-[1.6rem] font-sans mb-1">
                  {current?.name}
                </h2>
                <p className="text-xs text-neutral-100 font-light">
                  {formatDate(current?.time)}
                </p>
              </div>
              <div className="flex items-center gap-6 -translate-x-2">
                <Image
                  alt={`Weather condition: ${current?.weather_code ?? "Unknown"}`}
                  src={getWeatherImagePath(current.weather_code)}
                  as={NextImage}
                  width={100}
                  height={100}
                />
                <p
                  aria-label={`Current temperature ${Math.round(
                    current?.temperature_2m
                  )} degrees Celsius`}
                  className="text-8xl font-brico leading-10 italic"
                >
                  {Math.round(current?.temperature_2m)}°
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full mt-6">
        <li>
          <Card
            role="group"
            aria-label="Feels Like Temperature"
            className="bg-neutral-800 border border-neutral-600"
          >
            <CardBody className="space-y-3 p-4">
              <p className="text-nowrap text-sm text-neutral-200">Feels Like</p>
              <p
                className="text-2xl font-sans font-light text-neutral"
                aria-label={
                  isLoading
                    ? "Loading feels like temperature"
                    : `Feels like ${Math.round(
                        current?.temperature_2m ?? 0
                      )} degrees ${state.temperature == "celsius" ? "celsius" : "fahrenheit"}`
                }
              >
                {isLoading
                  ? "_"
                  : `${Math.round(current?.temperature_2m ?? 0)}°`}
              </p>
            </CardBody>
          </Card>
        </li>
        <li>
          <Card
            role="group"
            aria-label="Humidity"
            className="bg-neutral-800 border border-neutral-600"
          >
            <CardBody className="space-y-3 p-4">
              <p className="text-nowrap text-sm text-neutral-200">Humidity</p>
              <p
                className="text-2xl font-sans font-light text-neutral"
                aria-label={
                  isLoading
                    ? "Loading humidity"
                    : `Humidity ${Math.round(current?.relative_humidity_2m ?? 0)} percent`
                }
              >
                {isLoading
                  ? "_"
                  : `${Math.round(current?.relative_humidity_2m ?? 0)}%`}
              </p>
            </CardBody>
          </Card>
        </li>
        <li>
          <Card
            role="group"
            aria-label="Wind Speed"
            className="bg-neutral-800 border border-neutral-600"
          >
            <CardBody className="space-y-3 p-4">
              <p className="text-nowrap text-sm text-neutral-200">Wind</p>
              <p
                className="text-2xl font-sans font-light text-neutral"
                aria-label={
                  isLoading
                    ? "Loading wind speed"
                    : `Wind speed ${Math.round(
                        current?.wind_speed_10m ?? 0
                      )} ${state?.wind === "kmh" ? "kilometers per hour" : "miles per hour"}`
                }
              >
                {isLoading
                  ? "_"
                  : `${Math.round(current?.wind_speed_10m ?? 0)} ${state?.wind === "kmh" ? "kmh" : "mph"}`}
              </p>
            </CardBody>
          </Card>
        </li>
        <li>
          <Card
            role="group"
            aria-label="Wind Speed"
            className="bg-neutral-800 border border-neutral-600"
          >
            <CardBody className="space-y-3 p-4">
              <p className="text-nowrap text-sm text-neutral-200">
                Precipitation
              </p>
              <p
                className="text-2xl font-sans font-light text-neutral"
                aria-label={
                  isLoading
                    ? "Loading precipitation"
                    : `Precipitation ${Math.round(
                        current?.precipitation ?? 0
                      )} ${state?.precipitation == "inch" ? "inches" : "millimeters"}`
                }
              >
                {isLoading
                  ? "_"
                  : `${Math.round(current?.precipitation ?? 0)} ${state?.precipitation == "inch" ? "in" : "mm"}`}
              </p>
            </CardBody>
          </Card>
        </li>
      </ul>
    </div>
  );
}

export default CurrentForecast;
