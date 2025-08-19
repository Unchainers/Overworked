import { ImageOffIcon } from "lucide-react";
import ImageNotFound from "../custom/image-not-found";

function Comp({ media }: { media: any }) {
  return <img />;
}

export default function Thumbnail({ media }: { media?: any }) {
  return media ? <Comp media={media} /> : <ImageNotFound />;
}
