import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
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
      <div className="nav-wrapper">
        <div className="left-nav">{`<unreddit>`}</div>
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
      </div>
    );
    // user is logged in
  } else {
    body = (
      <div className="nav-wrapper">
        <Flex alignItems="center">
          <NextLink href="/">
            <Link>
              <div className="left-nav">{`<unreddit>`}</div>
            </Link>
          </NextLink>
        </Flex>

        <Flex className="right-nav" alignItems="center">
          <NextLink href="/create-post">
            <Button as={Link} mr={4}>
              Create Post
            </Button>
          </NextLink>

          <Box mr={4} color="#333" fontWeight="bold">
            {data.me.username}
          </Box>
          <Button
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            logout
          </Button>
        </Flex>
      </div>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="darkcyan" padding={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
