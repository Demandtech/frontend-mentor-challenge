"use client";

import { Hourlytype } from "@/types";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

interface HourCardPropsType {
  isLoading: boolean;
  hour_forecast: Hourlytype;
}

function HourCard({ hour_forecast, isLoading }: HourCardPropsType) {
 
  return (
    <Card className="w-full px-2 bg-neutral-700 rounded-lg border border-neutral-600 flex-col h-[52px]">
      {!isLoading && (
        <CardBody className="w-full p-0 h-full">
          <div className="flex w-full items-center my-auto">
            <Image
              src={hour_forecast?.image_path}
              alt={hour_forecast?.image_alt}
              className="w-9 h-9"
            />
            <span className="ml-1 text-foreground font-light text-base">
              {hour_forecast?.time}
            </span>
            <span className="ml-auto text-neutral-200 text-sm">
              {Math.round(hour_forecast?.temperature)}°
            </span>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

export default HourCard;
