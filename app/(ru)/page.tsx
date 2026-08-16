import LandingPage from "../components/LandingPage";
import { isRussianDomain } from "../lib/siteMetadata";

export default async function Home() {
  const lang = (await isRussianDomain()) ? "ru" : "en";
  return <LandingPage lang={lang} />;
}
