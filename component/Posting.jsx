import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/config";
import { Link } from "react-router-dom";

const Posting = ({ data, getTweets }) => {
  const user = useSelector((state) => state.users);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [inTweet, setIntweet] = useState(data.tweet);

  const deleteData = async () => {
    try {
      await axios.delete(`${baseUrl}/tweets/${data.id}`);
    } catch (error) {
      console.log(error);
    }
    toast({
      title: "Tweet removed.",
      description: "Your tweets have been deleted.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    getTweets();
    onClose();
  };
  const editData = async () => {
    try {
      await axios.patch(`${baseUrl}/tweets/${data.id}`, { tweet: inTweet });
    } catch (error) {
      console.log(error);
    }
    toast({
      title: "Tweet edited.",
      description: "Your tweet have been edited.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    onClose();
    getTweets();
  };
  // console.log(post);
  return (
    <Box minW={{ base: "90%", md: "460px" }} my="5px">
      <Stack
        flex=""
        key={data.id}
        spacing={4}
        p="2rem"
        boxShadow="dark-lg"
        borderRadius={20}
        border="-5px"
        alignItems="center"
      >
        <Box display="flex" justifyContent="space-between" w="480px">
          <Box display="flex" alignItems="center" m="10px">
            <Link to={`/profile/${data.user.id}`}>
              <IoPerson size="30px" />
            </Link>
          </Box>
          <Box w="350px">
            <Box display="flex">
              <Link to={`/profile/${data.user.id}`}>
                <Heading size="md">{data.user.username} </Heading>
              </Link>

              <Text mx="20px">{data.CreateAt}</Text>
            </Box>

            <Text> {data.tweet}</Text>
          </Box>
          <Box>
            {user.id === data.user.id ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<DragHandleIcon />}
                  bg={"transparant"}
                ></MenuButton>
                <MenuList>
                  <MenuItem onClick={deleteData}>Delete Tweet</MenuItem>
                  <MenuItem onClick={onOpen}>Edit Tweet</MenuItem>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Create your account</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl>
                          <FormLabel>First name</FormLabel>
                          <Textarea
                            placeholder={data.tweet}
                            value={inTweet}
                            height="200px"
                            maxLength="150"
                            onChange={(e) => setIntweet(e.target.value)}
                          >
                            {" "}
                          </Textarea>
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" onClick={editData} mr={3}>
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </MenuList>
              </Menu>
            ) : null}
          </Box>
        </Box>
        <Box display="flex">
          <Box mx="10px" pt="5px">
            <AiTwotoneLike />
          </Box>
          <Box mx="10px" pt="5px">
            <FaCommentAlt />
          </Box>
          <Box mx="10px" pt="5px">
            <FaRetweet />
          </Box>
          <Box mx="10px" pt="5px">
            <IoIosShareAlt />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Posting;
