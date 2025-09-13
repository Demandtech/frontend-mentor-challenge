import { State } from "./AppContext";

export type Action =
  | { type: "SET_MEASUREMENT" }
  | { type: "SET_TEMPERATURE"; payload: State["temperature"] }
  | { type: "SET_WIND"; payload: State["wind"] }
  | { type: "SET_PRECIPITATION"; payload: State["precipitation"] }
  | { type: "SET_LOCATION"; payload: { longitude: number; latitude: number } };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_TEMPERATURE":
      return { ...state, temperature: action.payload };
    case "SET_WIND":
      return { ...state, wind: action.payload };
    case "SET_PRECIPITATION":
      return { ...state, precipitation: action.payload };
    case "SET_MEASUREMENT":
      const isImperial = state.measurement === "Imperial";
      return {
        ...state,
        measurement: (isImperial
          ? "Metric"
          : "Imperial") as State["measurement"],
        temperature: (isImperial
          ? "celsius"
          : "fahrenheit") as State["temperature"],
        precipitation: (isImperial ? "mm" : "inch") as State["precipitation"],
        wind: (isImperial ? "kmh" : "mph") as State["wind"],
      };
    case "SET_LOCATION":
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
}
