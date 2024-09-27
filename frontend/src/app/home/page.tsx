"use client";

import React, { useRef, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiUpload, FiPlus, FiSearch } from "react-icons/fi";
// import MyChart from "../components/MyChart";

import "./page.module.css";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileToUpload, setFileToUpload] = useState<File>();

  function handleOpenUserFiles() {
    inputFileRef.current?.click();
  }
  function handleSelectInputFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files?.length < 1) return;
    const file = e.target.files[0];
    setFileToUpload(file);
  }

  function handleUploadFile() {}

  function handleSearchTransactions() {}

  return (
    <Flex w="100%" p="3%" flexDir="column" overflow="auto" minH="100vh">
      <Heading fontWeight="normal" mb={4} letterSpacing="tight">
        Welcome back,{" "}
        <Flex display="inline-flex" fontWeight="bold">
          Calvin
        </Flex>
      </Heading>
      {/* <MyChart /> */}
      <Flex justifyContent="space-between" mt={8}>
        <Flex align="flex-end">
          <Heading as="h2" size="lg" letterSpacing="tight">
            Transactions
          </Heading>
          <Text fontSize="small" color="gray" ml={4}>
            Apr 2021
          </Text>
        </Flex>
        <Flex display="inline-flex" alignItems="flex-end">
          <Text mr={2}>{fileToUpload?.name}</Text>
          <IconButton
            aria-label="Add or change file"
            icon={<FiPlus size={20} />}
            title="Add or change file"
            onClick={handleOpenUserFiles}
            type="button"
            colorScheme="blue"
            color="white"
            mr={2}
          />
          {fileToUpload && (
            <IconButton
              aria-label="Upload file"
              icon={<FiUpload size={20} />}
              title="Upload file"
              onClick={handleUploadFile}
              type="button"
            />
          )}
          <input
            type="file"
            accept="txt/csv"
            hidden
            ref={inputFileRef}
            onChange={handleSelectInputFile}
          />
        </Flex>
      </Flex>

      <Flex gap={2} mt={4}>
        <Input placeholder="Initial date" type="date" width="20%" />
        <Input placeholder="Final date" type="date" width="20%" lang="pt-BR" />
        <InputGroup
          border="none"
          borderColor="inherit"
          borderRadius="10px"
          width="50%"
        >
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray" />
          </InputLeftElement>
          <Input placeholder="Search by name" borderRadius="10px" />
        </InputGroup>
        <Button
          colorScheme="teal"
          variant="solid"
          width="10%"
          onClick={handleSearchTransactions}
        >
          Search
        </Button>
      </Flex>

      <Flex flexDir="column">
        <Flex overflow="auto">
          <Table variant="unstyled" mt={4}>
            <Thead>
              <Tr color="gray">
                <Th>Date</Th>
                <Th>Name</Th>
                <Th>Document</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>2024-06-13</Td>
                <Td>Fernando Abshire DDS</Td>
                <Td>37381486121</Td>
                <Td isNumeric>852211</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
}
