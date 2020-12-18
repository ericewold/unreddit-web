import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={() => {
          vote({
            postId: post.id,
            value: 1,
          });
        }}
        colorScheme={post.voteStatus === 1 ? "green" : "undefined"}
        className={post.voteStatus === 1 ? "" : "voteBtn"}
        icon={<ChevronUpIcon />}
        aria-label="Upvote"
        //className="voteBtn"
      />
      {post.points}
      <IconButton
        onClick={() => {
          vote({
            postId: post.id,
            value: -1,
          });
        }}
        colorScheme={post.voteStatus === -1 ? "red" : "undefined"}
        className={post.voteStatus === -1 ? "" : "voteBtn"}
        icon={<ChevronDownIcon />}
        aria-label="Downvote"
        //className="voteBtn"
      />
    </Flex>
  );
};
