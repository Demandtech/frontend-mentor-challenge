"use client";

import { DailyType } from "@/types";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import React from "react";

interface DayCardProps {
  isLoading: boolean;
  day_forcast: DailyType;
}

function DayCard({ isLoading, day_forcast }: DayCardProps) {
  return (
    <Card className="bg-neutral-800 border border-neutral-600 min-h-[142px]">
      {!isLoading && (
        <CardBody className="space-y-3 py-3 px-2 flex- flex-col items-center">
          <p className="text-center text-neutral">{day_forcast?.day}</p>
          <Image
            alt={day_forcast?.image_alt}
            src={day_forcast?.image_path}
            className="w-12"
          />
          <div className="flex justify-between text-sm font-light text-neutral-200 w-full">
            <p>{Math.round(day_forcast?.min_temperature)}°</p>
            <p>{Math.round(day_forcast?.max_temperature)}°</p>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

export default DayCard;
