import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <Flex w="100%" p="3%" flexDir="column" overflow="auto" minH="100vh">
      {children}
    </Flex>
  );
}
