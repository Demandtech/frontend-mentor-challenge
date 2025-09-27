import {
  formatDate,
  getDailyWeatherState,
  getHourlyWeatherState,
  getWeatherImagePath,
} from "@/lib/utils";
import { DailyType, Hourlytype } from "@/types";

describe("formatDate", () => {
  it("returns formatted date when valid string is provided", () => {
    const result = formatDate("2025-09-26T10:00:00Z");
    expect(result).toMatch(/Friday, Sep \d{1,2}, 2025/);
  });

  it("returns undefined when empty string is provided", () => {
    expect(formatDate("")).toBeUndefined();
  });

  it("return Invalid date for invalid input", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("Invalid Date");
  });
});

describe("getWeatherImagePath", () => {
  it.each([
    [0, "/assets/images/icon-sunny.webp"],
    [1, "/assets/images/icon-sunny.webp"],
    [2, "/assets/images/icon-partly-cloudy.webp"],
    [3, "/assets/images/icon-overcast.webp"],
    [45, "/assets/images/icon-fog.webp"],
    [48, "/assets/images/icon-fog.webp"],
    [51, "/assets/images/icon-drizzle.webp"],
    [55, "/assets/images/icon-drizzle.webp"],
    [61, "/assets/images/icon-rain.webp"],
    [65, "/assets/images/icon-rain.webp"],
    [71, "/assets/images/icon-snow.webp"],
    [75, "/assets/images/icon-snow.webp"],
    [80, "/assets/images/icon-storm.webp"],
    [99, "/assets/images/icon-storm.webp"],
    [123, "Unknown"],
  ])("maps code %d correctly", (code, expected) => {
    expect(getWeatherImagePath(code)).toBe(expected);
  });
});

describe("getDailyWeatherState", () => {
  const dates = ["2025-09-26", "2025-09-27"];
  const codes = [0, 2];
  const minTemps = [15, 20];
  const maxTemps = [25, 30];

  it("returns array of DailyType with formatted day and weather info", () => {
    const result = getDailyWeatherState(dates, codes, minTemps, maxTemps);

    expect(result).toEqual<DailyType[]>([
      {
        day: expect.any(String),
        image_path: "/assets/images/icon-sunny.webp",
        min_temperature: 15,
        max_temperature: 25,
        image_alt: "Weather icon",
      },
      {
        day: expect.any(String),
        image_path: "/assets/images/icon-partly-cloudy.webp",
        min_temperature: 20,
        max_temperature: 30,
        image_alt: "Weather icon",
      },
    ]);
  });

  it("handles empty arrays gracefully", () => {
    expect(getDailyWeatherState([], [], [], [])).toEqual([]);
  });
});

describe("getHourlyWeatherState", () => {
  const dates = [
    "2025-09-26T01:00:00Z",
    "2025-09-26T03:00:00Z",
    "2025-09-27T05:00:00Z",
  ];
  const codes = [0, 2, 3];
  const temps = [10, 12, 14];

  it("filters hours by selectedDay and sorts by hour", () => {
    const selectedDay = new Date(dates[0]).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const result = getHourlyWeatherState(dates, codes, temps, selectedDay);

    expect(result).toEqual<Hourlytype[]>([
      {
        temperature: 10,
        image_path: "/assets/images/icon-sunny.webp",
        image_alt: "Weather icon",
        time: expect.any(String),
      },
      {
        temperature: 12,
        image_path: "/assets/images/icon-partly-cloudy.webp",
        image_alt: "Weather icon",
        time: expect.any(String),
      },
    ]);
  });

  it("returns placeholder entries when no dates are provided", () => {
    const result = getHourlyWeatherState([], [], [], "Friday");

    expect(result).toHaveLength(8);
    result.forEach((entry) => {
      expect(entry).toEqual({
        temperature: null,
        image_path: "",
        image_alt: "",
        time: "",
      });
    });
  });
});
