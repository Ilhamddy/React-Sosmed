import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tweet from "../component/tweet";
import Posting from "../component/posting";
import { baseUrl } from "../utils/config";
import SimpleSidebar from "../component/Sidebar";
import Rightbar from "../component/Rightbar";

const Home = () => {
  const [tweets, setTweet] = useState([]);
  const getTweets = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/tweets/?_sort=id&_order=desc&_expand=user`
      );
      setTweet(response.data);
      console.log("posting", response.data);
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
      justifyContent="center"
      minW={{ base: "90%", md: "460px" }}
    >
      <Grid templateColumns={"repeat(3, 1fr)"}>
        <GridItem>
          <SimpleSidebar />
        </GridItem>
        <GridItem>
          <Flex
            flexDirection="column"
            height="max-content"
            p="10"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Tweet data={tweets} getTweets={getTweets} />
              {tweets.map((data) => {
                return (
                  <Posting key={data.id} data={data} getTweets={getTweets} />
                );
              })}
            </Stack>
          </Flex>
        </GridItem>
        <GridItem>
          <Rightbar tweets={tweets} />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
