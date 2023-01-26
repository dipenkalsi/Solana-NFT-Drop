import { useEffect, useMemo, useState } from "react";
import { ConnectionProvider , WalletProvider  } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter , SolflareWalletAdapter ,SkyWalletAdapter , GlowWalletAdapter ,MathWalletAdapter , NekoWalletAdapter ,NufiWalletAdapter , OntoWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css"
import Main from "./Main";
import { RPC_ENDPOINT } from "../utils";

export default function Home() {
  const [mounted , setMounted] = useState(false);

  const wallets= useMemo(()=>[
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SkyWalletAdapter(),
    new GlowWalletAdapter(),
    new MathWalletAdapter(),
    new NekoWalletAdapter(),
    new OntoWalletAdapter(),
    new NufiWalletAdapter(),
  ],[])

  useEffect(()=>{
    setMounted(true)
  },[])

  return (
    <ConnectionProvider
    endpoint={RPC_ENDPOINT}
    config={{commitment:"confirmed"}}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
    {mounted && 
    <div className=" bg-fixed bg-hero3 bg-contain bg-repeat w-full">
    <Main className="overflow-x-hidden"/>
    </div>
    }
    </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}
