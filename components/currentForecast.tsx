import { formatDate, getWeatherImagePath } from "@/lib/utils";
import { Card, CardBody } from "@heroui/card";
import React from "react";
import CurrentForecastLoader from "./currentForecastloader";
import { CurrentType } from "@/types";
import { useApp } from "./context/AppContext";
import { Image } from "@heroui/image";

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
        <Card className={`lg:h-[236px] rounded-[26px] relative overflow-hidden`}>
          <Image
            removeWrapper
            src="/assets/images/bg-today-large.svg"
            className="h-full w-full object-cover rounded-large"
            srcSet="/assets/images/bg-today-small.svg 600w, /assets/images/bg-today-large.svg 1200w"
          />
          <CardBody className="px-5 items-center flex-row z-10 absolute top-1/2 -translate-y-1/2">
            <div className="my-auto flex w-full justify-between items-center flex-col md:flex-row gap-5">
              <div className="text-center md:text-start md:max-w-1/2">
                <h2 className="font-semibold text-[1.6rem] font-sans mb-1">
                  {current?.name}
                </h2>
                <p className="text-sm text-neutral-100 font-light">
                  {formatDate(current?.time)}
                </p>
              </div>
              <div className="flex items-center gap-6 -translate-x-2">
                <Image
                  // priority
                  alt="daily forecast icon"
                  src={getWeatherImagePath(current.weather_code)}
                  width={100}
                  height={100}
                />
                <p className="text-8xl font-brico leading-10 italic">
                  {Math.round(current?.temperature_2m)}°
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full mt-6">
        <Card className="bg-neutral-800 border border-neutral-600">
          <CardBody className="space-y-3 p-4">
            <p className="text-nowrap text-sm text-neutral-200">Feels Like</p>
            <p className="text-2xl font-sans font-light text-neutral">
              {isLoading ? "_" : `${Math.round(current?.temperature_2m ?? 0)}°`}
            </p>
          </CardBody>
        </Card>
        <Card className="bg-neutral-800 border border-neutral-600">
          <CardBody className="space-y-3 p-4">
            <p className="text-nowrap text-sm text-neutral-200">Humidity</p>
            <p className="text-2xl font-sans font-light text-neutral">
              {" "}
              {isLoading
                ? "_"
                : `${Math.round(current?.relative_humidity_2m ?? 0)}%`}
            </p>
          </CardBody>
        </Card>
        <Card className="bg-neutral-800 border border-neutral-600">
          <CardBody className="space-y-3 p-4">
            <p className="text-nowrap text-sm text-neutral-200">Wind</p>
            <p className="text-2xl font-sans font-light text-neutral">
              {isLoading
                ? "_"
                : `${Math.round(current?.wind_speed_10m ?? 0)} ${state?.wind === "kmh" ? "kmh" : "mph"}`}
            </p>
          </CardBody>
        </Card>
        <Card className="bg-neutral-800 border border-neutral-600">
          <CardBody className="space-y-3 p-4">
            <p className="text-nowrap text-sm text-neutral-200">
              Precipitation
            </p>
            <p className="text-2xl font-sans font-light text-neutral">
              {isLoading
                ? "_"
                : `${Math.round(current?.precipitation ?? 0)} ${state?.precipitation == "inch" ? "in" : "mm"}`}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CurrentForecast;
