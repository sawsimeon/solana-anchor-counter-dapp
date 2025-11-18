import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../../../target/idl/counter.json";

const PROGRAM_ID = new PublicKey(import.meta.env.VITE_PROGRAM_ID || "Counter111111111111111111111111111111111111");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export const getProvider = (wallet: WalletContextState) => {
  if (!wallet.connected || !wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
    return null;
  }
  return new AnchorProvider(connection, wallet as any, { commitment: "confirmed" });
};

export const getProgram = (wallet: WalletContextState) => {
  const provider = getProvider(wallet);
  if (!provider) return null;
  return new Program(idl as any, PROGRAM_ID, provider);
};

export const getCounterPDA = (user: PublicKey) => {
  return web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), user.toBuffer()],
    PROGRAM_ID
  );
};