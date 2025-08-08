import "@/styles/globals.css";
import type {AppProps} from "next/app";
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
