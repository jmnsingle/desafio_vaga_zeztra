import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import ReactRouterLink from "next/link";
import { FiHome, FiUsers } from "react-icons/fi";

export default function SideMenu() {
  return (
    <Flex
      w={["100%", "100%", "10%", "15%", "15%"]}
      flexDir="column"
      alignItems="center"
      backgroundColor="#020202"
      color="#fff"
    >
      <Flex
        flexDir="column"
        h={[null, null, "100vh"]}
        justifyContent="space-between"
      >
        <Flex flexDir="column" as="nav">
          <Heading
            mt={50}
            mb={[25, 50, 100]}
            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
            alignSelf="center"
            letterSpacing="tight"
          >
            Zeztra
          </Heading>
          <Flex
            flexDir={["row", "row", "column", "column", "column"]}
            align={["center", "center", "center", "flex-start", "flex-start"]}
            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
            justifyContent="center"
          >
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
              <Link display={["none", "none", "flex", "flex", "flex"]}>
                <Icon as={FiHome} fontSize="2xl" className="active-icon" />
              </Link>
              <Link
                _hover={{ textDecor: "none" }}
                display={["flex", "flex", "none", "flex", "flex"]}
                as={ReactRouterLink}
                href="/"
              >
                <Text ml={2} className="active">
                  Home
                </Text>
              </Link>
            </Flex>
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
              <Link display={["none", "none", "flex", "flex", "flex"]}>
                <Icon as={FiUsers} fontSize="2xl" />
              </Link>
              <Link
                _hover={{ textDecor: "none" }}
                display={["flex", "flex", "none", "flex", "flex"]}
                as={ReactRouterLink}
                href="/users"
              >
                <Text ml={2}>Users</Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
