import CounterApp from "../components/CounterApp";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  const network = clusterApiUrl("devnet");
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <CounterApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}