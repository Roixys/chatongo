import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Box, VStack, Text, Center } from "@chakra-ui/react";

const ChatArea = ({ selectedChat, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && selectedChat) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat?.messages]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      {selectedChat ? (
        <>
          {/* Chat messages container */}
          <VStack
            spacing={2}
            align="stretch"
            overflowY="auto"
            flexGrow={1}
            padding={4}
          >
            {selectedChat.messages.map((msg, index) => (
              <Box
                key={index}
                alignSelf={
                  msg.sender_type === "user" ? "flex-end" : "flex-start"
                }
                bg={msg.sender_type === "user" ? "blue.500" : "gray.200"}
                color={msg.sender_type === "user" ? "white" : "black"}
                borderRadius="md"
                padding={2}
                maxWidth="70%"
                marginBottom={1}
              >
                <Text>{msg.message}</Text>
              </Box>
            ))}
            {/* Dummy div to allow scrolling to the bottom */}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input area */}
          <Box padding={4} borderTopWidth="1px" borderColor="gray.200">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              marginBottom={2}
            />
            <Button
              colorScheme="blue"
              onClick={handleSendMessage}
              isDisabled={message.trim() === ""}
            >
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Center height="100%">
          <Text>Select a chat to start messaging</Text>
        </Center>
      )}
    </Box>
  );
};

export default ChatArea;
