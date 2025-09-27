"use client";

import { DailyType } from "@/types";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import React from "react";
import NextImage from "next/image";
import { Skeleton } from "@heroui/skeleton";

interface DayCardProps {
  isLoading: boolean;
  day_forcast: DailyType;
}

function DayCard({ isLoading, day_forcast }: DayCardProps) {
  return (
    <Skeleton
      className="dark bg-primary rounded-lg after:!bg-neutral-600
     before:!via-neutral-800"
      isLoaded={!isLoading}
    >
      <Card
        role="group"
        aria-label={`Forecast for ${day_forcast?.day}, low of ${Math.round(day_forcast?.min_temperature)} degrees, high of ${Math.round(day_forcast?.max_temperature)} degrees, ${day_forcast?.image_alt}`}
        className="bg-neutral-800 border border-neutral-600 min-h-35"
      >
        {!isLoading && (
          <CardBody className="space-y-3 py-3 px-2 flex- flex-col items-center">
            <p className="text-center text-neutral">{day_forcast?.day}</p>
            <Image
              width={48}
              height={48}
              as={NextImage}
              alt={day_forcast?.image_alt}
              src={day_forcast?.image_path}
            />
            <div className="flex justify-between text-sm font-light text-neutral-200 w-full">
              <p
                aria-label={`Low ${Math.round(day_forcast?.min_temperature)} degrees`}
              >
                {Math.round(day_forcast?.min_temperature)}°
              </p>
              <p
                aria-label={`High ${Math.round(day_forcast?.max_temperature)} degrees`}
              >
                {Math.round(day_forcast?.max_temperature)}°
              </p>
            </div>
          </CardBody>
        )}
      </Card>
    </Skeleton>
  );
}

export default DayCard;
