import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Rightbar = ({ tweets }) => {
  return (
    <Box mt="10" mr="10px">
      <Flex
        flexDir="column"
        gap={5}
        p="40px"
        rounded="20px"
        boxShadow="dark-lg"
      >
        {tweets.map((data) => {
          return (
            <Box flexDir="column" key={data.id}>
              <Button
                alignItems="center"
                mr="3"
                colorScheme="#d368fc"
                _hover={{
                  bg: "#c0c0c0",
                }}
                variant="ghost"
              >
                <Icon as={IoPersonAddSharp} boxSize={5} />
                <Link to={`/profile/${data.user.id}`}>
                  <Text fontSize="20px" ml="4">
                    {data.user.username}
                  </Text>
                </Link>
              </Button>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Rightbar;
