import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit Post"
          className="voteBtn"
          mr={2}
        />
      </NextLink>
      <IconButton
        onClick={() => {
          deletePost({ id });
        }}
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        className="voteBtn"
      />
    </Box>
  );
};
