import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostsQuery } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={() => console.log("up")}
        icon={<ChevronUpIcon />}
        aria-label="Upvote"
      />
      {post.points}
      <IconButton
        onClick={() => console.log("down")}
        icon={<ChevronDownIcon />}
        aria-label="Downvote"
      />
    </Flex>
  );
};
