"use client";

import { useState, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import DropdownIcon from "@/public/assets/images/icon-dropdown.svg";
import { Selection } from "@react-types/shared";
import { Card, CardBody, CardHeader } from "@heroui/card";
import HourCard from "./hourCard";
import { getHourlyWeatherState } from "@/lib/utils";

interface HourlyForecastProps {
  isLoading: boolean;
  hourly: {
    time: string[];
    weather_code: number[];
    temperature_2m: number[];
  };
}

function HourlyForecast({ isLoading, hourly }: HourlyForecastProps) {
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayKey = days.find((d) => d.label === todayName)?.key ?? "mon";
  const [selected, setSelected] = useState<Selection>(new Set([todayKey]));

  const selectedValue = useMemo(() => {
    const key = Array.from(selected)[0];
    const day = days.find((d) => d.key === key);
    return day ? day.label : "";
  }, [selected]);

  const hoursForecast = getHourlyWeatherState(
    hourly?.time,
    hourly?.weather_code,
    hourly?.temperature_2m,
    selectedValue
  );

  const emptyForecast = Array(8).fill({
    temperature: null,
    image_path: "",
    image_alt: "",
    time: "",
  });

  return (
    <Card className="bg-neutral-800 pt-3 pb-5 px-0 max-h-[607px] rounded-2xl custom-scrollbar">
      <CardHeader className="justify-between pl-5 pr-6">
        <h5 className="font-lg lg:text-xl font-semibold font-sans">
          Hourly forecast
        </h5>
        <Dropdown
          placement="bottom-end"
          className="relative bg-neutral-800 rounded-md border-1 border-neutral-700"
        >
          <DropdownTrigger>
            <Button
              className="data-[focus=true]:outline-neutral-200 bg-neutral-600 capitalize text-foreground rounded-md"
              variant="solid"
              endContent={<DropdownIcon />}
            >
              {isLoading ? "-" : selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Days of the week dropdown"
            disallowEmptySelection
            color="primary"
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            items={days}
            hideSelectedIcon
          >
            {(item) => (
              <DropdownItem
                className="data-[focus-visible=true]:outline-1 data-[focus-visible=true]:outline-neutral-200 data-[selected=true]:bg-neutral-700"
                key={item.key}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="flex items-center justify-between gap-3 py-1 custom-scrollbar px-5">
        {(hoursForecast ?? emptyForecast).map((item, index) => {
          return (
            <div className="w-full" key={String(index + "--key")}>
              <HourCard isLoading={isLoading} hour_forecast={item} />
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}

const days = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];
export default HourlyForecast;
