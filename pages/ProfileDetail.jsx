import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { IoDocumentTextOutline, IoPerson } from "react-icons/io5";
import { MdInsertEmoticon, MdOutlineKeyboardVoice } from "react-icons/md";
import { useSelector } from "react-redux";
import Posting from "../component/posting";
import { baseUrl } from "../utils/config";
import Rightbar from "../component/Rightbar";

const ProfileDetail = () => {
  //selector post tweet
  const userId = useSelector((state) => state.users);
  //selector get posting
  const user = useSelector((state) => state.users);

  //usestate post tweet
  const [tweet, setTweet] = useState("");
  //usestate get posting
  const [tweets, setTweets] = useState([]);

  // post tweet
  const handleTweet = async () => {
    try {
      await axios.post(baseUrl + `/tweets`, {
        tweet: tweet,
        userId: user.id,
        createdAt: new Date(),
      });
      setTweet("");
    } catch (error) {
      console.log(error);
    } finally {
      getTweets();
    }
  };

  // get postingan
  const getTweets = async () => {
    try {
      const response = await axios.get(
        baseUrl + `/tweets?userId=${user.id}&_expand=user&_sort=id&_order=desc`
      );
      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <Container
      maxWidth="8xl"
      display="grid"
      justifyContent="center"
      minW={{ base: "90%", md: "460px" }}
    >
      {/* <Rightbar /> */}
      <Box fontFamily={"monospace"} my="5px">
        <Flex justify={"center"} mt={"15px"} fontSize={"xxx-large"}>
          {" "}
          Profile Detail
        </Flex>
      </Box>
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
            <Box>
              <Text>{userId.email}</Text>
            </Box>
            <Textarea
              placeholder="tweet ur post"
              height="200px"
              maxLength="150"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
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
            onClick={handleTweet}
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
      <Box>
        {tweets.map((tweet) => {
          return <Posting key={tweet.id} data={tweet} getTweets={getTweets} />;
        })}
      </Box>
    </Container>
  );
};

export default ProfileDetail;
