"use client";

import { Button } from "@heroui/button";
import ErrorIcon from "@/public/assets/images/icon-error.svg";

interface ApiErrorProps {
  refetch: () => void;
}

function ApiError({ refetch }: ApiErrorProps) {
  return (
    <div className="flex gap-3 flex-col  items-center max-w-[500px] mx-auto text-center">
      <ErrorIcon className="mb-2" />
      <h2 className="text-xl md:text-[2.679999rem] font-bold font-brico">
        Something went wrong
      </h2>
      <p className="font-light font-sans text-sm md:text-lg px-6">
        We couldn't connect to the server(API error). Please try again in few
        moment
      </p>
      <Button onPress={() => refetch()} size="sm" color="primary">
        Retry
      </Button>
    </div>
  );
}

export default ApiError;
