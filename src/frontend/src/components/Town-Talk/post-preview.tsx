import { Post } from "../../../../declarations/towntalk/towntalk.did";
import { Badge } from "../ui/badge";
import Thumbnail from "./thumbnail";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <div className="relative">
      <Thumbnail
      // media={post.medias[0]}
      />
      {post.medias.length > 1 && (
        <Badge className="absolute right-2 top-2">{post.medias.length}</Badge>
      )}
    </div>
  );
}
