import { ChakraProvider, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatSidebar from "./components/ChatSidebar";
import ChatArea from "./components/ChatArea";
import { BACKEND_URL } from "./config";

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/histories`);
        setChats(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch chat histories. Please try again later.");
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleNewChat = () => {
    const newChat = {
      id: null,
      name: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setSelectedChat(newChat);
  };

  const handleSelectChat = async (chat) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/histories/${chat.id}/chats`
      );
      const chatWithMessages = { ...chat, messages: response.data };
      setSelectedChat(chatWithMessages);
    } catch (error) {
      setError("Failed to fetch chat messages. Please try again later.");
    }
  };

  const handleSendMessage = async (message) => {
    if (selectedChat) {
      try {
        const chatId = selectedChat.id || (await createNewChat(message)).id;

        const response = await axios.post(
          `${BACKEND_URL}/histories/${chatId}/chats`,
          {
            message,
          }
        );

        const {
          id,
          message: userMessage,
          created_at,
          bot_response,
        } = response.data;

        updateChatUI(chatId, userMessage, "user", created_at);
        updateChatUI(chatId, bot_response, "bot");
      } catch (error) {
        setError("Failed to send message. Please try again later.");
      }
    }
  };

  const updateChatUI = (chatId, message, senderType, createdAt) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...(chat.messages || []),
                { message, sender_type: senderType, created_at: createdAt },
              ],
            }
          : chat
      )
    );
    setSelectedChat((prevChat) =>
      prevChat?.id === chatId
        ? {
            ...prevChat,
            messages: [
              ...(prevChat.messages || []),
              { message, sender_type: senderType, created_at: createdAt },
            ],
          }
        : prevChat
    );
  };

  const createNewChat = async (message) => {
    const response = await axios.post(`${BACKEND_URL}/histories`, {
      name: extractChatName(message),
    });
    return response.data;
  };

  const extractChatName = (message) => {
    const sentences = message.split(". ").filter(Boolean);
    return sentences.slice(0, 2).join(". ") || "New Chat";
  };

  if (loading) {
    return (
      <ChakraProvider>
        <Flex height="100vh" align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Flex height="100vh" align="center" justify="center" p={4}>
          <Text color="red.500" fontSize="lg" textAlign="center">
            {error}
          </Text>
        </Flex>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Flex height="100vh">
        <ChatSidebar
          chats={chats}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
        />
        <Box flex="1" bg="gray.100" height="100vh">
          <ChatArea
            selectedChat={selectedChat}
            onSendMessage={handleSendMessage}
          />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
