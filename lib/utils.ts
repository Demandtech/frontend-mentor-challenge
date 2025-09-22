import { DailyType, Hourlytype } from "@/types";

export function formatDate(dateString: string) {
  if (!dateString) return;
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formatted;
}

export function getDailyWeatherState(
  dates: string[],
  codes: number[],
  min_temperatures: number[],
  max_temperatures: number[]
): DailyType[] {
  const state = dates?.map((date, index) => {
    const day = new Date(date);

    const formatted = day.toLocaleDateString("en-US", {
      weekday: "short",
    });

    return {
      day: formatted,
      image_path: getWeatherImagePath(codes[index]),
      min_temperature: min_temperatures[index],
      max_temperature: max_temperatures[index],
      image_alt: "Weather icon",
    };
  });

  return state;
}

export function getHourlyWeatherState(
  dates: string[],
  codes: number[],
  temperatures: number[],
  selectedDay: string
): Hourlytype[] {
  const today = new Date();
  const currentHour = today.getHours();

  if (!dates?.length) {
    return Array(8).fill({
      temperature: null,
      image_path: "",
      image_alt: "",
      time: "",
    });
  }

  return dates
    ?.map((date, index) => {
      const day = new Date(date);

      const formatted = day.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const hours = day.getHours();
      const time = day.toLocaleTimeString("en-us", {
        hour: "numeric",
        hour12: true,
      });

      return {
        hours,
        time,
        days: formatted,
        temperature: temperatures[index],
        image_path: getWeatherImagePath(codes[index]),
        image_alt: "Weather icon",
      };
    })
    .filter((entries) => entries.days === selectedDay)
    .sort((cur, acc) => cur.hours - acc.hours)
    .map(({ temperature, image_alt, image_path, time }) => ({
      temperature,
      image_path,
      image_alt,
      time,
    }));
  // .filter((_, index) => index % 3 == 0);
}

export function getWeatherImagePath(code: number) {
  switch (code) {
    case 0:
    case 1:
      return "/assets/images/icon-sunny.webp";
    case 2:
      return "/assets/images/icon-partly-cloudy.webp";
    case 3:
      return "/assets/images/icon-overcast.webp";
    case 45:
    case 48:
      return "/assets/images/icon-fog.webp";
    case 51:
    case 53:
    case 55:
      return "/assets/images/icon-drizzle.webp";
    case 61:
    case 63:
    case 65:
      return "/assets/images/icon-rain.webp";
    case 71:
    case 73:
    case 75:
      return "/assets/images/icon-snow.webp";
    case 80:
    case 81:
    case 82:
    case 95:
    case 96:
    case 99:
      return "/assets/images/icon-storm.webp";
    default:
      return "Unknown";
  }
}
