import localFont from "next/font/local";

export const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Black.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});
