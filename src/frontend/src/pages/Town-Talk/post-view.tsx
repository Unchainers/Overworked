import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FeedPost } from "../../../../declarations/towntalk/towntalk.did";
import { Heart, MessageCircle, PoundSterling, Share, User } from "lucide-react";
import ProfilePicture from "@/components/Town-Talk/profile-picture";
import { convertToFile } from "@/lib/utils";

export default function PostView({
  post,
  handleMute,
  handleLike,
  handleComment,
  handleShare,
}: {
  post: FeedPost;
  handleMute: () => void;
  handleLike: (post_id: string) => Promise<void>;
  handleComment: (post_id: string) => void;
  handleShare: (post_id: string) => void;
}) {
  return (
    <Card className="!m-0">
      <CardHeader className="flex flex-row items-center space-x-2">
        {post.poster.profile_picture.length ? (
          <ProfilePicture
            photo={convertToFile(post.poster.profile_picture[0])}
            containerClassName="w-4 h-4"
            rounded
          />
        ) : (
          <User className="h-4 w-4" />
        )}
        <p>{post.poster.username}</p>
      </CardHeader>
      <CardContent>
        <div onClick={handleMute}></div>
        <div className="ml-4 flex flex-row items-center">
          <Heart onClick={() => handleLike(post.id)} />
          <MessageCircle onClick={() => handleComment(post.id)} />
          <Share onClick={() => handleShare(post.id)} />
        </div>
      </CardContent>
      <CardFooter>
        <p>{post.caption}</p>
      </CardFooter>
    </Card>
  );
}
