
import {
    Box,
    Button,
    Flex,
    Icon,
    Text
} from '@chakra-ui/react';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";





export default function SimpleSidebar() {
    return (
        <Box mt="10"   >
            <Flex flexDir="column" gap={5} p='40px' rounded='20px' boxShadow='dark-lg' >
                <Box flexDir="column" >
                    <Button
                        alignItems="center"
                        mr="3"
                        colorScheme="#d368fc"
                        _hover={{
                            bg: "#c0c0c0",
                        }}
                        variant="ghost"
                    >
                        <Icon as={FaHome} boxSize={5} />
                        <Text fontSize="20px" ml="4">Home</Text>
                    </Button>
                </Box>
                <Box flexDir="column">
                    <Button
                        alignItems="center"
                        mr="3"
                        colorScheme="#d368fc"
                        _hover={{
                            bg: "#c0c0c0",
                        }}
                        variant="ghost"
                    >
                        <Icon as={IoMdNotifications} boxSize={5} />
                        <Text fontSize="20px" ml="4">Notification</Text>
                    </Button>
                </Box>
                <Box flexDir="column">
                    <Button
                        alignItems="center"
                        mr="3"
                        colorScheme="#d368fc"
                        _hover={{
                            bg: "#c0c0c0",
                        }}
                        variant="ghost"
                    >
                        <Icon as={MdMessage} boxSize={5} />
                        <Text fontSize="20px" ml="4">Message</Text>
                    </Button>
                </Box>
                <Box flexDir="column">
                    <Button
                        alignItems="center"
                        mr="3"
                        colorScheme="#d368fc"
                        _hover={{
                            bg: "#c0c0c0",
                        }}
                        variant="ghost"
                    >
                        <Icon as={CgProfile} boxSize={5} />
                        <Text fontSize="20px" ml="4">Profile</Text>
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}



