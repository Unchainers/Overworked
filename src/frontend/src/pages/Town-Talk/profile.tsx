import ProfilePicture from "@/components/Town-Talk/profile-picture";
import StatsNumeric from "@/components/Town-Talk/stats-numeric";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Account, Post } from "../../../../declarations/towntalk/towntalk.did";
import useTownTalk from "@/hooks/use-town-talk";
import PostPreview from "@/components/Town-Talk/post-preview";
import { AccountVisibleInformation } from "../../../../declarations/towntalk/towntalk.did";
import { useParams } from "react-router";

export default function Profile() {
  const { activeAccountID } = useTownTalk();
  const { accountID } = useParams() as { accountID: string };

  const isOwn = activeAccountID === accountID;

  const [account, setAccount] = useState<AccountVisibleInformation>();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>();

  const postContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsFollowing(
      account?.followers.find(
        (follower) => follower[0][0] === activeAccountID,
      ) !== undefined,
    );
  }, [account, activeAccountID]);

  return (
    <div
      className="flex h-screen w-full flex-col items-center space-y-8"
      ref={postContainerRef}
    >
      {/* Header */}
      <div className="flex flex-col items-center space-y-6">
        <div className="flex-row items-center justify-between">
          {/* Profile Picture */}
          <ProfilePicture
          // photo={account?.profile.profile_picture}
          />

          {/* Statistics */}
          <div className="flex h-full flex-col items-center justify-between space-y-4">
            {/* Name */}
            <h2>{account?.username}</h2>

            {/* Stats and Utils */}
            <div className="flex flex-col space-y-2">
              {/* Stats */}
              <div className="flex flex-row items-center justify-evenly space-x-4">
                <StatsNumeric
                  label="Followers"
                  value={account?.followers.length.toString() ?? "889"}
                />
                <StatsNumeric
                  label="Following"
                  value={account?.following.length.toString() ?? "764"}
                />
                <StatsNumeric
                  label="Posts"
                  value={account?.post_count[0]?.toString() ?? "333"}
                />
              </div>

              <Button variant={isFollowing || isOwn ? "outline" : "default"}>
                {isOwn ? "Settings" : isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
        <p>{account?.about}</p>
      </div>

      {/* Posts */}
      <div className="grid w-full grid-cols-3 items-center justify-center gap-2">
        {posts.map((post, idx) => (
          <PostPreview post={post} key={idx} />
        ))}
      </div>
    </div>
  );
}
