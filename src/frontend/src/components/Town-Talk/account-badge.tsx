import { cn } from "@/lib/utils";
import { AccountVisibleInformation } from "../../../../declarations/towntalk/towntalk.did";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProfilePicture from "./profile-picture";
import { AccountBriefInformation } from "@/types/town-talk-types";
import { User, UserCircle } from "lucide-react";

export default function AccountBadge({
  account,
  onClick,
  containerClassName,
}: {
  account: AccountBriefInformation;
  onClick?: (account: AccountBriefInformation) => void;
  containerClassName?: HTMLDivElement["className"];
}) {
  return (
    <Card
      className={cn(
        containerClassName,
        "rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md duration-150 hover:bg-gray-500/5",
      )}
      onClick={() => {
        if (onClick) onClick(account);
      }}
    >
      <CardContent className="flex flex-row items-center space-x-2">
        <ProfilePicture photo={account.profile_picture} />
        <CardTitle className="flex items-center">@{account.username}</CardTitle>
      </CardContent>
    </Card>
  );
}
