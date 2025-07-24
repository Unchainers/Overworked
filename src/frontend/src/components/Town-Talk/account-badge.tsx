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
      className={cn(containerClassName, "")}
      onClick={() => {
        if (onClick) onClick(account);
      }}
    >
      <CardHeader />
      <CardContent className="flex flex-row items-center justify-center space-x-2">
        {account.profile_picture && (
          <ProfilePicture photo={account.profile_picture} />
        )}
        <CardTitle>{account.username}</CardTitle>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
