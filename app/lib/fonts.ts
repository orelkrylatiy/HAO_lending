import localFont from "next/font/local";

// WOFF2 с сабсетами кириллицы/латиницы (~32 КБ на начертание).
// TTF-оригиналы лежат рядом — для пересборки сабсетов см. scripts/.
export const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});
