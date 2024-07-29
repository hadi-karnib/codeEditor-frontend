import React, { useState } from "react";
import "./Login.css";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = async () => {
    console.log("login button clicked");

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      toast.error("Invalid email address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      // Make the login request
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      const { data } = response;
      if (data.status === "success") {
        const { token } = data.authorization;
        if (token) {
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token); // Use jwt-decode to decode the token
          if (decoded.role === "admin") {
            navigate("/admindashboard");
          } else if (decoded.role === "user") {
            navigate("/home");
          }
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      } else {
        toast.error("Login failed: " + response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error("An error occurred during login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="LoginMainDiv">
      <ToastContainer />
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
        <FormControl isInvalid={!!emailError} w="75%" mb={5}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" pr={4}>
              <FontAwesomeIcon icon={faEnvelope} color="#0582ca" />
            </InputLeftElement>
            <Input
              variant="flushed"
              placeholder="Email"
              textColor="white"
              pl={7}
              mb={4}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onKeyPress={handleKeyPress}
            />
          </InputGroup>
          {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
        </FormControl>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputGroup>
        <Button colorScheme="blue" w="75%" onClick={handleLogin}>
          Login
        </Button>
        <Text color={"white"}>
          Already have an account?
          <Link
            to="/register"
            style={{
              color: "#0582ca",
            }}
          >
            Register here
          </Link>
        </Text>
      </Box>
    </div>
  );
};

export default Login;
