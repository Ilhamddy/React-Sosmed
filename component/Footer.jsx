import React from 'react'
import { Box, Button, ButtonGroup, Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div>
            <Box bg={'#164863'} padding={'40px'} alignContent={'center'} breakpoints={["0em", "30em", "48em", "62em", "80em", "96em"]} flex={''} >
                <Center>
                    <Flex alignItems='center' gap='2'>
                        <Box p='2'>
                            <Heading size='md' color={'#ffffff'}></Heading>
                        </Box>
                        <Flex>
                            <ButtonGroup gap='2' >
                                <Button color='#F2FFE9' textColor={'#164863'} _hover={{ bg: '#164863', color: 'white', }}>
                                    <Link to={'/'}> User</Link>
                                </Button>
                                <Button color='#F2FFE9' textColor={'#164863'} _hover={{ bg: '#164863', color: 'white', }} >
                                    <Link to={'/register'}> Register</Link>
                                </Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                </Center>
            </Box>
        </div >
    )
}

export default Footer