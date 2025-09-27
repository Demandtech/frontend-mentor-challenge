"use client";

import DailyForecast from "@/components/dailyForecast";
import HourlyForecast from "@/components/hourlyForecast";
import SearchForm from "@/components/searchForm";
import ApiError from "@/components/api_error";
import { useForecast } from "@/hooks/useForecast";
import CurrentForecast from "@/components/currentForecast";
import { useApp } from "@/components/context/AppContext";

export default function Home() {
  const { data } = useForecast();
  const { isLoading, isError } = useApp();

  const noResult = !isLoading && !data && !isError;

  console.log(isLoading)

  return (
    <section className="w-full">
      {isError ? (
        <ApiError />
      ) : (
        <div>
          <div className="text-center w-full pt-10">
            <h1 className="font-brico leading-14 text-[3.2rem] font-semibold px-6 md:px-3 lg:px-0">
              How's the sky looking today?
            </h1>
            <SearchForm />
          </div>
          <div className="mt-5 lg:mt-10 w-full">
            {noResult ? (
              <div>
                <p className="text-center font-semibold text-2xl">
                  No search result found!
                </p>
              </div>
            ) : (
              <div className="w-full grid lg:grid-cols-3  gap-4 lg:gap-5">
                <div className="lg:col-span-2">
                  <CurrentForecast
                    isLoading={isLoading}
                    current={data?.current}
                  />
                  <DailyForecast isLoading={isLoading} daily={data?.daily} />
                </div>
                <div className="col-span-1">
                  <HourlyForecast isLoading={isLoading} hourly={data?.hourly} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
