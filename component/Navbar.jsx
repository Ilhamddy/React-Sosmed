import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/slices/usersSlices";
import { LuSunMoon } from "react-icons/lu";
import { BsMoonStars } from "react-icons/bs";

import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const selector = useSelector((state) => state.users.id);
  console.log(selector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = async () => {
    const getUser = await axios.get("http://localhost:2000/users");
    setData(getUser.data);
    console.log(getUser);
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    localStorage.removeItem("setStorage");
    dispatch(logoutAction());
    navigate("/");
  };

  const token = JSON.parse(localStorage.getItem("setStorage"));

  return (
    <div>
      <Box
        padding={"40px"}
        breakpoints={["0em", "30em", "48em", "62em", "80em", "96em"]}
        boxShadow="lg"
        borderRadius={20}
      >
        <Flex alignItems="center" gap="2" justify="space-between">
          <Box p="2">
            <Heading size="md" color={"#39A7FF"} fontStyle="italic">
              <Flex gap="3">
                <FaRocket />
                <Text onClick={() => navigate("/")}>ddyTweet</Text>
              </Flex>{" "}
            </Heading>
          </Box>
          <Flex>
            {token ? (
              <Menu>
                <Box onClick={toggleColorMode} bg="transparent" mr="20px">
                  {colorMode === "light" ? (
                    <LuSunMoon size="40px" />
                  ) : (
                    <LuSunMoon size="40px" />
                  )}
                </Box>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{token.usernameOrEmail}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={logout}> Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <ButtonGroup gap="2">
                <Box onClick={toggleColorMode} bg="transparent" mr="10px">
                  {colorMode === "light" ? (
                    <LuSunMoon size="40px" />
                  ) : (
                    <LuSunMoon size="40px" />
                  )}
                </Box>
                <Button
                  color="dark"
                  textColor={"#39A7FF"}
                  _hover={{ bg: "#39A7FF", color: "white" }}
                >
                  <Link to={"/login"}> Login</Link>
                </Button>
                <Button
                  color="#F2FFE9"
                  textColor={"#39A7FF"}
                  _hover={{ bg: "#39A7FF", color: "white" }}
                >
                  <Link to={"/register"}> Register</Link>
                </Button>
              </ButtonGroup>
            )}
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Navbar;
