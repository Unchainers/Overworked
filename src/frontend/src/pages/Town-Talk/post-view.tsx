import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FeedPost as BackendFeedPost } from "../../../../declarations/towntalk/towntalk.did";
import { Heart, MessageCircle, PoundSterling, Share, User } from "lucide-react";
import ProfilePicture from "@/components/Town-Talk/profile-picture";
import { convertToFile } from "@/lib/utils";

type DisplayFeedPost = Omit<BackendFeedPost, "medias"> & { medias: string[] };

export default function PostView({
  post,
  handleMute,
  handleLike,
  handleComment,
  handleShare,
}: {
  post: DisplayFeedPost;
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
        <div onClick={handleMute}>
          <img src={post.medias[0]} />
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="flex flex-row items-center space-x-2">
            <Heart onClick={() => handleLike(post.id)} />
            <p>{post.likes.length}</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <MessageCircle onClick={() => handleComment(post.id)} />
            <p>{post.comments.length}</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Share onClick={() => handleShare(post.id)} />
            <p>{post.shares.length}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>{post.caption}</p>
      </CardFooter>
    </Card>
  );
}
