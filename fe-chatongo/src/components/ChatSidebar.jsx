import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const ChatSidebar = ({ chats, onSelectChat, onNewChat }) => {
  return (
    <Box
      w="300px"
      bg="gray.800"
      color="white"
      h="100vh"
      p={4}
      borderRightWidth="1px"
      borderRightColor="gray.700"
      display="flex"
      flexDirection="column"
      shadow="lg"
    >
      <VStack align="start" spacing={4} flex="1" overflowY="auto">
        <Text fontSize="2xl" fontWeight="bold" color="teal.300">
          Chatongo
        </Text>
        <List spacing={3} width="100%">
          {chats.map((chat) => (
            <ListItem
              key={chat.id}
              p={3}
              borderRadius="md"
              bg="gray.700"
              _hover={{ bg: "gray.600", cursor: "pointer" }}
              onClick={() => onSelectChat(chat)}
            >
              {chat.name}
            </ListItem>
          ))}
        </List>
      </VStack>
      <Button
        mt="auto"
        colorScheme="teal"
        leftIcon={<Icon as={AddIcon} />}
        onClick={onNewChat}
        variant="solid"
        size="lg"
      >
        New Chat
      </Button>
    </Box>
  );
};

export default ChatSidebar;
