"use client";

import { Hourlytype } from "@/types";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";

interface HourCardPropsType {
  isLoading: boolean;
  hour_forecast: Hourlytype;
}

function HourCard({ hour_forecast, isLoading }: HourCardPropsType) {
  console.log(hour_forecast);
  return (
    <Card className="flex w-full flex-col items-center p-2 bg-neutral-700 rounded-lg border border-neutral-600 min-h-[58px]">
      {!isLoading && (
        <CardBody className="w-full p-0">
          <div className="flex w-full items-center">
            <Image
              src={hour_forecast?.image_path}
              alt={hour_forecast?.image_alt}
              width={40}
              height={40}
            />
            <span className="ml-1 text-foreground">{hour_forecast?.time}</span>
            <span className="ml-auto text-neutral-300">
              {hour_forecast?.temperature}°
            </span>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

export default HourCard;
