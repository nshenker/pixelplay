import { AppProps } from "next/app";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import Top from "@/pages/Top"; // FIX: Import 'Top' without curly braces for a default export.

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const App = ({ Component, pageProps }: AppProps) => {
  // You can also use WalletAdapterNetwork.Devnet or WalletAdapterNetwork.Testnet
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
  // and lazy loading -- Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/*
            Instead of the default <Component {...pageProps} />,
            we are rendering the <Top /> component directly as the main page.
          */}
          <Top />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
