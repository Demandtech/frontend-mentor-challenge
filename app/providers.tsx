"use client";

import type { ThemeProviderProps } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProvider } from "@/components/context/AppContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export default function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <AppProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </AppProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
