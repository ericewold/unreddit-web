import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg='tomato' padding={4}>
      <Box ml={'auto'}>
        <NextLink href='/login'>
          <Link color='white' fontWeight='bold' mr={4}>
            login
          </Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='white' fontWeight='bold'>
            register
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
