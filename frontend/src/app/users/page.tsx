"use client";
import {
  Flex,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import SideMenu from "../components/SideMenu";
import Container from "../components/Container";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEdit,
  FiPlus,
  FiTrash,
} from "react-icons/fi";

export default function Users() {
  function handleAddNewUser() {}

  function handleNextPage() {}

  function handlePreviousPage() {}

  function handleEditUser(user_id: number) {}

  function handleDeleteUser(user_id: number) {}

  return (
    <Flex
      h={[null, null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      <SideMenu />

      <Container>
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Users
            </Heading>
          </Flex>
          <Flex display="inline-flex" alignItems="flex-end">
            <IconButton
              aria-label="Add new user"
              icon={<FiPlus size={20} />}
              title="Add new user"
              onClick={handleAddNewUser}
              type="button"
              colorScheme="blue"
              color="white"
              mr={2}
            />
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th textAlign="left">Creation Date</Th>
                  <Th>Name</Th>
                  <Th>Document</Th>
                  <Th textAlign="right">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign="left">2024-06-13</Td>
                  <Td>Fernando Abshire DDS</Td>
                  <Td>37381486121</Td>
                  <Td textAlign="right">
                    <Flex display="inline-flex" gap={4}>
                      <IconButton
                        aria-label="Edit user"
                        icon={<FiEdit size={20} />}
                        title="Edit user"
                        onClick={() => handleEditUser(1)}
                        colorScheme="purple"
                      />
                      <IconButton
                        aria-label="Delete user"
                        icon={<FiTrash size={20} />}
                        title="Delete user"
                        onClick={() => handleDeleteUser(1)}
                        colorScheme="red"
                      />
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    <Flex display="inline-flex" alignItems="center" gap={10}>
                      <IconButton
                        aria-label="Previous page"
                        icon={<FiArrowLeft size={20} />}
                        title="Previous page"
                        onClick={handlePreviousPage}
                      />
                      <Text>1/10</Text>
                      <IconButton
                        aria-label="Next page"
                        icon={<FiArrowRight size={20} />}
                        title="Next page"
                        onClick={handleNextPage}
                      />
                    </Flex>
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
