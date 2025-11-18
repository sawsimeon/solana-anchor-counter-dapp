import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect } from "react";
import { getProgram, getCounterPDA } from "../utils/solana";

export default function CounterApp() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    if (!wallet.publicKey) return;
    const program = getProgram(wallet);
    if (!program) return;

    try {
      const [counterPda] = getCounterPDA(wallet.publicKey);
      const account = await program.account.counter.fetch(counterPda);
      setCount(Number(account.count));
    } catch (err) {
      setCount(null); // Not initialized yet
    }
  };

  useEffect(() => {
    fetchCount();
  }, [wallet.publicKey]);

  const initialize = async () => {
    setLoading(true);
    const program = getProgram(wallet);
    if (!program || !wallet.publicKey) return;

    try {
      const [counterPda] = getCounterPDA(wallet.publicKey);
      await program.methods.initialize()
        .accounts({
          counter: counterPda,
          user: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
      await fetchCount();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const increment = async () => {
    setLoading(true);
    const program = getProgram(wallet);
    if (!program || !wallet.publicKey) return;

    const [counterPda] = getCounterPDA(wallet.publicKey);
    await program.methods.increment().accounts({ counter: counterPda, authority: wallet.publicKey }).rpc();
    await fetchCount();
    setLoading(false);
  };

  const decrement = async () => {
    setLoading(true);
    const program = getProgram(wallet);
    if (!program || !wallet.publicKey) return;

    const [counterPda] = getCounterPDA(wallet.publicKey);
    await program.methods.decrement().accounts({ counter: counterPda, authority: wallet.publicKey }).rpc();
    await fetchCount();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Solana Counter dApp</h1>
          <WalletMultiButton />
        </div>

        {!wallet.connected ? (
          <p className="text-center text-gray-600">Connect your wallet to start</p>
        ) : count === null ? (
          <div className="text-center">
            <p className="mb-6 text-gray-700">No counter found. Initialize one!</p>
            <button
              onClick={initialize}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              {loading ? "Initializing..." : "Initialize Counter"}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <p className="text-gray-600 text-sm">Your Counter</p>
              <p className="text-6xl font-bold text-indigo-600">{count}</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={decrement}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
              >
                −
              </button>
              <button
                onClick={increment}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}