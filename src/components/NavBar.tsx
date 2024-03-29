import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <Flex className="nav-wrapper">
        <Flex className="left-nav">{`<unreddit>`}</Flex>
        <Flex className="right-nav">
          <NextLink href="/login">
            <Link color="white" fontWeight="bold" mr={4}>
              login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white" fontWeight="bold">
              register
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    );
    // user is logged in
  } else {
    body = (
      <Flex className="nav-wrapper">
        <Flex alignItems="center">
          <NextLink href="/">
            <Link>
              <Flex className="left-nav">{`<unreddit>`}</Flex>
            </Link>
          </NextLink>
        </Flex>

        <Flex className="right-nav" alignItems="center" height="60px">
          <NextLink href="/create-post">
            <Button as={Link} mr={4}>
              Create Post
            </Button>
          </NextLink>

          <Flex mr={4} color="#333" fontWeight="bold" alignItems="center">
            {data.me.username}
          </Flex>
          <Button
            onClick={async () => {
              await logout();
              router.reload();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            logout
          </Button>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="darkcyan" padding={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
