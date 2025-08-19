import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FeedPost as BackendFeedPost } from "../../../../declarations/towntalk/towntalk.did";
import { Heart, MessageCircle, PoundSterling, Share, User } from "lucide-react";
import ProfilePicture from "@/components/Town-Talk/profile-picture";
import { cn, convertToFile } from "@/lib/utils";
import { RefObject, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

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
  const [mediaIndex, setMediaIndex] = useState<number>(0);

  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleScroll = () => {
    const container = mediaContainerRef.current;

    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    const newIndex = Math.round(scrollLeft / containerWidth);

    if (newIndex !== mediaIndex) {
      setMediaIndex(newIndex);

      const currMedia = mediaRefs.current[newIndex];

      if (currMedia) {
        container.style.height = `${currMedia.offsetHeight}px`;
      }
    }
  };

  return (
    <Card className="!m-0 min-h-screen max-w-md place-self-center">
      <CardHeader className="flex flex-row items-center space-x-2">
        <ProfilePicture
          photo={convertToFile(post.poster.profile_picture[0])}
          containerClassName="w-4 h-4"
          rounded
        />
        <p>{post.poster.username}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div
            ref={mediaContainerRef}
            onScroll={handleScroll}
            onClick={handleMute}
            className={cn(
              "max-w-full",
              post.medias.length > 1 &&
                "hide-scrollbar flex h-fit snap-x snap-mandatory flex-row overflow-y-hidden overflow-x-scroll",
            )}
          >
            {post.medias.map((media, idx) => (
              <img
                key={idx}
                ref={(el) => {
                  mediaRefs.current[idx] = el;
                }}
                src={media}
                alt=""
                className="h-fit w-auto snap-start"
              />
            ))}
          </div>

          {post.medias.length > 1 && (
            <Badge className="absolute right-5 top-5">
              {mediaIndex + 1}/{post.medias.length}
            </Badge>
          )}
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
