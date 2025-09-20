"use client";

import { Button } from "@heroui/button";
import ErrorIcon from "@/public/assets/images/icon-error.svg";
import RefreshIcon from "@/public/assets/images/refresh.svg";
import { Dispatch, SetStateAction } from "react";

function ApiError() {
  return (
    <div className="flex gap-4 flex-col  items-center max-w-[500px] mx-auto text-center">
      <ErrorIcon className="mb-2 scale-125" />
      <h2 className="text-xl md:text-[2.679999rem] font-bold font-brico">
        Something went wrong
      </h2>
      <p className="font-light font-sans text-sm md:text-lg px-6">
        We couldn't connect to the server(API error). Please try again in few
        moment
      </p>
      <Button
        onPress={() => window.location.reload()}
        size="md"
        color="primary"
      >
        <RefreshIcon />
        Retry
      </Button>
    </div>
  );
}

export default ApiError;
