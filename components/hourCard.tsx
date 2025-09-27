"use client";

import { Hourlytype } from "@/types";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";
import NextImage from "next/image";

interface HourCardPropsType {
  isLoading: boolean;
  hour_forecast: Hourlytype;
}

function HourCard({ hour_forecast, isLoading }: HourCardPropsType) {
  return (
    <Skeleton
      isLoaded={!isLoading}
      className="dark h-13 bg-primary rounded-lg after:!bg-neutral-600
    before:!via-neutral-800"
    >
      <Card
        role="group"
        aria-label={`Forecast for ${hour_forecast.time}, ${Math.round(hour_forecast.temperature)} degrees, ${hour_forecast.image_alt}`}
        className="w-full bg-neutral-700 rounded-lg border border-neutral-600 flex-col h-13"
      >
        <CardBody className="w-full px-2 py-0 h-full">
          <div className="flex w-full items-center my-auto">
            <Image
              src={hour_forecast?.image_path}
              alt={hour_forecast?.image_alt}
              className="w-9 h-9"
              height={36}
              width={36}
              as={NextImage}
            />
            <span className="ml-1 text-foreground font-light text-base">
              {hour_forecast?.time}
            </span>
            <span className="ml-auto text-neutral-200 text-sm">
              {Math.round(hour_forecast?.temperature)}°
            </span>
          </div>
        </CardBody>
      </Card>
    </Skeleton>
  );
}

export default HourCard;
