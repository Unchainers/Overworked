import { ImageOffIcon } from "lucide-react";

export default function ImageNotFound() {
  return (
    <div className="bg-muted flex h-full w-full items-center justify-center p-6">
      <ImageOffIcon className="text-muted-foreground" />
    </div>
  );
}
