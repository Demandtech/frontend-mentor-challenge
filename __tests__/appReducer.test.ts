import { reducer, Action } from "@/components/context/appReducer";
import { State } from "@/components/context/AppContext";

const initialState: State = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
  measurement: "Metric",
  longitude: undefined,
  latitude: undefined,
};

describe("appReducer", () => {
    
  it("handles SET_MEASUREMENT (Imperial → Metric)", () => {
    const imperialState: State = {
      ...initialState,
      measurement: "Imperial",
      temperature: "fahrenheit",
      precipitation: "inch",
      wind: "mph",
    };
    const action: Action = { type: "SET_MEASUREMENT" };
    const result = reducer(imperialState, action);
    expect(result.measurement).toBe("Metric");
    expect(result.temperature).toBe("celsius");
    expect(result.wind).toBe("kmh");
    expect(result.precipitation).toBe("mm");
  });

  it("handles SET_TEMPERATURE", () => {
    const action: Action = { type: "SET_TEMPERATURE", payload: "fahrenheit" };
    const result = reducer(initialState, action);
    expect(result.temperature).toBe("fahrenheit");
    expect(result).toMatchObject({
      ...initialState,
      temperature: "fahrenheit",
    });
  });

  it("handles SET_WIND", () => {
    const action: Action = { type: "SET_WIND", payload: "mph" };
    const result = reducer(initialState, action);
    expect(result.wind).toBe("mph");
  });

  it("handles SET_PRECIPITATION", () => {
    const action: Action = { type: "SET_PRECIPITATION", payload: "inch" };
    const result = reducer(initialState, action);
    expect(result.precipitation).toBe("inch");
  });

  it("handles SET_MEASUREMENT (Metric → Imperial)", () => {
    const action: Action = { type: "SET_MEASUREMENT" };
    const result = reducer(initialState, action);
    expect(result.measurement).toBe("Imperial");
    expect(result.temperature).toBe("fahrenheit");
    expect(result.wind).toBe("mph");
    expect(result.precipitation).toBe("inch");
  });

  it("handles SET_LOCATION", () => {
    const action: Action = {
      type: "SET_LOCATION",
      payload: { latitude: 10, longitude: 20 },
    };
    const result = reducer(initialState, action);
    expect(result.latitude).toBe(10);
    expect(result.longitude).toBe(20);
  });

  it("returns state unchanged for unknown action", () => {
    // @ts-expect-error intentionally wrong
    const action: Action = { type: "UNKNOWN" };
    const result = reducer(initialState, action);
    expect(result).toBe(initialState);
  });
});
