import React, { useState } from "react";
import "./Login.css";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = () => {
    console.log("login button clicked");
    navigate("/home");
    console.log(email, password);
  };
  return (
    <div className="LoginMainDiv">
      <Box
        bg="#003354"
        w="27%"
        h="50%"
        minW="300px"
        p={4}
        color="#051923"
        borderRadius={34}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontSize="3xl" color="white" mb={10}>
          Login
        </Text>
        <InputGroup w="75%" mb={5}>
          <InputLeftElement pointerEvents="none" pr={4}>
            <FontAwesomeIcon icon={faEnvelope} color="#0582ca" />
          </InputLeftElement>
          <Input
            variant="flushed"
            placeholder="Email"
            textColor="white"
            pl={7}
            mb={4}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup w="75%" mb={5}>
          <InputLeftElement pointerEvents="none" pr={4}>
            <FontAwesomeIcon icon={faLock} color="#0582ca" />
          </InputLeftElement>
          <Input
            variant="flushed"
            placeholder="Password"
            textColor="white"
            pl={7}
            mb={4}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button colorScheme="blue" w="75%" onClick={handlelogin}>
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
