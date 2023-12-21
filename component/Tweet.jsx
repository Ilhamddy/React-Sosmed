import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/config";
import { FaRegImages } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { format } from "date-fns/esm";
import { formatRelative, subDays } from "date-fns";

// import tweets from './Posting'

const Tweet = ({ tweets, getTweets }) => {
  // const toast = useToast();
  const userId = useSelector((state) => state.users);
  const [tweet, setTweet] = useState("");
  const toast = useToast();
  //   const date = new Date();
  const dateFormatted = formatRelative(subDays(new Date(), 0), new Date());

  // const date = formatDistance(new Date(tweets.CreateAt), new Date(), {
  //     addSuffix: true,
  // })

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setTweet(inputValue);
  };

  const onSubmit = async () => {
    try {
      if (!userId.username)
        return toast({
          title: "Please login.",
          description: "Please Login first and post Your tweet ",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      if (tweet === "")
        return toast({
          title: "Tweet Empty.",
          description: "Your tweet should not be empty type something.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      await axios.post(`${baseUrl}/tweets`, {
        userId: userId.id,
        tweet,
        CreateAt: dateFormatted,
      });
      setTweet("");
    } catch (error) {
      console.log("tweet error", error);
    }
    toast({
      title: "Tweet Posting.",
      description: "Your tweet has been successfully posted.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setTweet("");
    getTweets();
  };

  return (
    <Box minW={{ base: "90%", md: "460px" }}>
      <Stack
        spacing={4}
        p="2rem"
        boxShadow="dark-lg"
        borderRadius={20}
        border="-5px"
        alignItems="center"
      >
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Tweet Your day
        </Heading>
        <FormControl width="500px" padding="20px">
          <Box display="flex" alignItems="center">
            <IoPerson size="25px" />
            <Text m="10px" fontWeight="20px">
              {userId.username}
            </Text>
          </Box>
          <Textarea
            placeholder="tweet ur post"
            height="200px"
            maxLength="150"
            value={tweet}
            onChange={handleInputChange}
          >
            {" "}
          </Textarea>
          <Box display="flex" my="20px">
            <Text>{tweet.length}/150</Text>
            <Box mx="5px" p="5px">
              <FaRegImages />
            </Box>
            <Box mx="5px" p="5px">
              {" "}
              <MdInsertEmoticon />
            </Box>
            <Box mx="5px" p="5px">
              {" "}
              <IoDocumentTextOutline />
            </Box>
            <Box mx="5px" p="5px">
              {" "}
              <MdOutlineKeyboardVoice />{" "}
            </Box>
          </Box>
        </FormControl>
        <Button
          onClick={onSubmit}
          type="submit"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Tweet
        </Button>
      </Stack>
    </Box>
  );
};

export default Tweet;
