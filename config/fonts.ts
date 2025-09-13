import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/DM_Sans/static/DMSans-Light.ttf",
      style: "light",
      weight: "300",
    },
    {
      path: "../public/fonts/DM_Sans/static/DMSans-Medium.ttf",
      style: "medium",
      weight: "500",
    },
    {
      path: "../public/fonts/DM_Sans/static/DMSans-SemiBold.ttf",
      style: "semibold",
      weight: "600",
    },
    {
      path: "../public/fonts/DM_Sans/static/DMSans-SemiBoldItalic.ttf",
      style: "italic",
      weight: "600",
    },
    {
      path: "../public/fonts/DM_Sans/static/DMSans-Bold.ttf",
      style: "bold",
      weight: "700",
    },
  ],
  variable: "--font-sans",
});

export const fontBrico = localFont({
  src: [
    {
      path: "../public/fonts/Bricolage_Grotesque/static/BricolageGrotesque-Bold.ttf",
      style: "bold",
      weight: "700",
    },
  ],
  variable: "--font-brico",
});
