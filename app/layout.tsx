
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { HeroUiProviders } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontBrico } from "@/config/fonts";
import Header from "@/components/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background antialiased",
          fontSans.variable,
          fontBrico.variable
        )}
      >
        <HeroUiProviders
          themeProps={{ attribute: "class", defaultTheme: "light" }}
        >
          <div className="relative min-h-screen w-full">
            <div className="container max-w-7xl h-full py-5 lg:py-10 mx-auto px-4 md:px-8 lg:px-16">
              <Suspense>
                <Header />
              </Suspense>
              <main className="mt-4 md:mt-6 lg:pt-10 flex-grow">
                {children}
              </main>
            </div>
          </div>
        </HeroUiProviders>
      </body>
    </html>
  );
}
