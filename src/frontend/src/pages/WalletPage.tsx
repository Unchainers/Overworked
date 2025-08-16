import {
  BadgeDollarSign,
  Check,
  HandHelping,
  Link as LinkIcon,
  PartyPopper,
  Users,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth-client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import clsx from "clsx";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const basicOffers: Array<{
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  label: string;
}> = [
  {
    Icon: Check,
    iconColor: "text-green-600",
    label: "Verified Work",
  },
  {
    Icon: LinkIcon,
    iconColor: "text-gray-500",
    label: "Secure Process",
  },
  {
    Icon: HandHelping,
    iconColor: "text-ow-primary",
    label: "Inclusive Opportunities",
  },
  {
    Icon: Users,
    iconColor: "text-blue-600",
    label: "Helping Community",
  },
  {
    Icon: BadgeDollarSign,
    iconColor: "text-yellow-600",
    label: "On-Chain Rewards",
  },
  {
    Icon: PartyPopper,
    iconColor: "text-ow-secondary",
    label: "Engaging Events",
  },
];

export default function WalletPage() {
  const { login } = useAuth();

  return (
    <div
      className="animate-gradient-x-background flex h-screen w-screen overflow-x-hidden bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600"
      style={{ background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)" }}
    >
      <div className="flex h-full w-3/5 flex-col items-end space-y-4 rounded-br-3xl rounded-tr-3xl bg-white p-8">
        <h1 className="mb-4 text-right text-9xl font-bold text-black">
          Welcome to Overworked!
        </h1>
        <h2 className="text-right text-3xl font-bold text-black">
          Turn Your Hustle into Rewards.
        </h2>
        <p className="text-muted w-3/4 text-right text-xl">
          Build your future on-chain with Overworked — the blockchain-powered
          platform that rewards real effort, tracks contributions, and empowers
          decentralized teams.
        </p>
        <div className="flex w-full justify-center">
          <Carousel
            infinite
            autoPlay
            showDots={false}
            arrows={false}
            swipeable
            draggable
            containerClass="py-4 w-full h-32"
            itemClass="px-2"
            autoPlaySpeed={3000}
            responsive={responsive}
          >
            {basicOffers.map((offer, idx) => (
              <div className="flex flex-row items-center space-x-4" key={idx}>
                <offer.Icon className={clsx("h-12 w-12", offer.iconColor)} />
                <p className="text-xl">{offer.label}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="grid grid-cols-2"></div>
        <button
          type="button"
          id="loginButton"
          onClick={login}
          className="w-28 transform place-self-end self-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-6 py-3 font-bold text-white transition-all duration-150 hover:bg-gradient-to-br focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Connect
        </button>
      </div>

      <div className="flex h-full w-2/5 items-center justify-center">
        <img
          src="/images/Beaver-nobg.png"
          className="h-full object-contain"
          alt="Bover"
        />
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
