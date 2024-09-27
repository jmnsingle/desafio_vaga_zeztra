"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  InputGroup,
  InputLeftElement,
  Tfoot,
} from "@chakra-ui/react";
import {
  FiUpload,
  FiPlus,
  FiSearch,
  FiArrowRight,
  FiArrowLeft,
  FiLoader,
} from "react-icons/fi";
// import MyChart from "../components/MyChart";

import SideMenu from "./components/SideMenu";
import Container from "./components/Container";

import "./page.module.css";
import { parseAsInteger, useQueryState } from "nuqs";
import { format } from "date-fns";

type Transaction = {
  id: string;
  nome: string;
  cpfCnpj: string;
  data: string;
  valor: number;
  created_at: Date;
  updated_at: Date;
};

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<{
    total: number;
    transactions: Transaction[];
  }>({ total: 0, transactions: [] });
  const [initialDate, setInitialDate] = useQueryState("initial_date", {
    defaultValue: format(new Date(), "yyyy-MM-dd"),
  });
  const [finalDate, setFinalDate] = useQueryState("final_date", {
    defaultValue: format(new Date(), "yyyy-MM-dd"),
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [name, setName] = useQueryState("name", { defaultValue: "" });

  const isNextButtonDisabled = Math.ceil(transactions.total / 10) <= page;
  const isPreviousButtonDisabled = page <= 1;

  function handleOpenUserFiles() {
    inputFileRef.current?.click();
  }

  function handleSelectInputFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files?.length < 1) return;
    const file = e.target.files[0];
    setFileToUpload(file);
  }

  async function handleUploadFile() {
    if (!fileToUpload) return;
    const formData = new FormData();
    formData.append("transactions", fileToUpload);
    setIsLoading(true);
    fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then(async (response) => {
        setFileToUpload(null);
        alert(response.message);
        await handleSearchTransactions();
      })
      .catch((e) => {
        console.log("ERROR", e);
      })
      .finally(() => setIsLoading(false));
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  function handlePreviousPage() {
    setPage((prev) => prev - 1);
  }

  const handleSearchTransactions = useCallback(async () => {
    setIsLoading(true);
    fetch(
      "http://localhost:3001/api/transactions?" +
        new URLSearchParams({
          initialDate,
          finalDate,
          page: page.toString(),
          name,
        }).toString()
    )
      .then((response) => response.json())
      .then((response) => {
        setTransactions({
          total: response.total_of_transactions,
          transactions: response.transactions,
        });
      })
      .catch((e) => {
        console.log("ERROR", e);
      })
      .finally(() => setIsLoading(false));
  }, [finalDate, initialDate, name, page]);

  useEffect(() => {
    handleSearchTransactions().then();
  }, [handleSearchTransactions]);

  return (
    <Flex
      h={[null, null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      <SideMenu />

      <Container>
        <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back,{" "}
          <Flex display="inline-flex" fontWeight="bold">
            Zeztra
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
              disabled={isLoading}
              cursor={isLoading ? "not-allowed" : "pointer"}
            />
            {fileToUpload && (
              <IconButton
                aria-label="Upload file"
                icon={
                  isLoading ? <FiLoader size={20} /> : <FiUpload size={20} />
                }
                title="Upload file"
                onClick={handleUploadFile}
                type="button"
                disabled={isLoading}
                cursor={isLoading ? "not-allowed" : "pointer"}
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
          <Input
            placeholder="Initial date"
            type="date"
            width="20%"
            value={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
          />
          <Input
            placeholder="Final date"
            type="date"
            width="20%"
            value={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
          />
          <InputGroup
            border="none"
            borderColor="inherit"
            borderRadius="10px"
            width="60%"
          >
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input
              placeholder="Search by name"
              borderRadius="10px"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
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
                {transactions.transactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.data}</Td>
                    <Td>{transaction.nome}</Td>
                    <Td>{transaction.cpfCnpj}</Td>
                    <Td isNumeric>{transaction.valor}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                {transactions.total > 0 ? (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      <Flex display="inline-flex" alignItems="center" gap={10}>
                        <IconButton
                          aria-label="Previous page"
                          icon={<FiArrowLeft size={20} />}
                          title="Previous page"
                          onClick={handlePreviousPage}
                          disabled={isPreviousButtonDisabled}
                          cursor={
                            isPreviousButtonDisabled ? "not-allowed" : "pointer"
                          }
                        />
                        <Text>
                          {page}/{Math.ceil(transactions.total / 10)}
                        </Text>
                        <IconButton
                          aria-label="Next page"
                          icon={<FiArrowRight size={20} />}
                          title="Next page"
                          onClick={handleNextPage}
                          disabled={isNextButtonDisabled}
                          cursor={
                            isNextButtonDisabled ? "not-allowed" : "pointer"
                          }
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ) : (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      <Text>Transactions not found</Text>
                    </Td>
                  </Tr>
                )}
              </Tfoot>
            </Table>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
