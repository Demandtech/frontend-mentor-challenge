export type PlaceType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type UnitsType = {
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "inch";
  measurement: "Metric" | "Imperial";
};

export type GroupType = Record<
  Exclude<keyof UnitsType, "measurement">,
  string[]
>;

export type CurrentType = {
  name: string;
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
};

export type DailyType = {
  min_temperature: number;
  max_temperature: number;
  day: string;
  image_path: string;
  image_alt: string;
};

export type Hourlytype = {
  time: string;
  temperature: number;
  image_path: string;
  image_alt: string;
}
