import { useAuth } from "../hooks/use-auth-client";

export default function WalletPage() {
  const { login } = useAuth();

  return (
    <div
      className="animate-gradient-x-background flex h-screen w-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600"
      style={{ background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)" }}
    >
      <div className="flex h-full w-1/2 items-center justify-center">
        <img
          src="/images/Beaver-nobg.png"
          className="h-full object-contain"
          alt="Bover"
        />
      </div>

      <div className="flex h-full w-1/2 flex-col items-start justify-center space-y-4 rounded-bl-3xl rounded-tl-3xl bg-white p-8">
        <h1 className="mb-4 text-center text-6xl font-bold text-black">
          Welcome to Overworked
        </h1>
        <h2 className="text-xl font-bold text-black">
          Work Smarter. Get Overworked.
        </h2>
        <p className="w-3/4 text-black">
          Build your future on-chain with Overworked — the blockchain-powered
          platform that rewards real effort, tracks contributions, and empowers
          decentralized teams.
        </p>
        <div className="grid grid-cols-2">
          <p className="text-black">✅ Verified Work</p>
          <p className="text-black">🔗 Immutable Proof</p>
          <p className="text-black">💰 On-Chain Rewards</p>
        </div>
        <button
          type="button"
          id="loginButton"
          onClick={login}
          className="w-full transform rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-6 py-3 font-bold text-white transition-all duration-150 hover:bg-gradient-to-br focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Connect
        </button>
      </div>
    </div>
    // <div
    //   className="flex h-screen w-full items-center justify-center"
    //   style={{ background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)" }}
    // >
    //   <div className="max-w-lg rounded-lg bg-white p-10 shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-800">
    //     <h1 className="mb-4 text-center text-3xl font-bold text-purple-500">
    //       Welcome to Overworked
    //     </h1>
    //     <p className="mb-8 text-center text-lg text-purple-400">
    //       Please Login First!
    //     </p>
    //     <button
    //       type="button"
    //       id="loginButton"
    //       onClick={login}
    //       className="w-full transform rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-6 py-3 font-bold text-white transition-all duration-150 hover:bg-gradient-to-br focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    //     >
    //       Connect
    //     </button>
    //     <p className="mt-4 text-center text-sm text-purple-400">
    //       Secure, transparent, and unforgettable experiences await!
    //     </p>
    //   </div>
    // </div>
  );
}
