import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
  Reducer,
  SetStateAction,
  useState,
} from "react";
import { Action, reducer } from "./appReducer";
import { UnitsType } from "@/types";

export interface State {
  temperature: UnitsType["temperature"];
  wind: UnitsType["wind"];
  precipitation: UnitsType["precipitation"];
  measurement: UnitsType["measurement"];
  longitude?: number;
  latitude?: number;
}

interface AppContextValueType {
  state: State;
  dispatch: Dispatch<Action>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextValueType | null>(null);

const defaultValue: State = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
  measurement: "Metric",
  longitude: undefined,
  latitude: undefined,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    ...defaultValue,
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
     
        dispatch({ type: "SET_LOCATION", payload: { latitude, longitude } });
      },
      (err) => {
       
        console.error("Geolocation error", err);
        setIsLoading(false);
        setIsError(true);
      }
    );
  }, []);

 

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        searchQuery,
        setSearchQuery,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (context == undefined) {
    throw new Error("useApp must be used with an App context");
  }

  return context;
}
