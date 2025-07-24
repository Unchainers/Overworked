import { useEffect, useMemo } from "react";
import { AccountVisibleInformation } from "../../../../declarations/towntalk/towntalk.did";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ProfilePicture({
  photo,
  onClick,
  containerClassName,
  width = 300,
  height = 300,
  rounded = true,
}: {
  photo: File;
  onClick?: (account: AccountVisibleInformation) => void;
  containerClassName?: HTMLDivElement["className"];
  width?: number;
  height?: number;
  rounded?: boolean;
}) {
  const objectUrl = useMemo(() => URL.createObjectURL(photo), [photo]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  return (
    <div
      className={containerClassName}
      style={{
        width,
        height,
        borderRadius: rounded ? "50%" : "0%",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={
        onClick ? () => onClick?.({} as AccountVisibleInformation) : undefined
      }
    >
      <Avatar about="Profile Picture">
        <AvatarImage src={objectUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
