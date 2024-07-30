import React, { useEffect, useState } from "react";
import "./Register.css";
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
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  const handleRegister = async () => {
    console.log("Register button clicked");

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
      const response = await axios.post("http://127.0.0.1:8000/api/create", {
        username: username,
        email: email,
        password: password,
      });

      const { data } = response;
      if (data.status === "success") {
        const { token } = data.authorization;
        if (token) {
          localStorage.setItem("token", token);
          toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          navigate("/home"); // Redirect to home page
        }
      } else {
        toast.error("Registration failed: " + data.message, {
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
      console.error("Registration error:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          toast.error("Email is already taken", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
        if (errors.username) {
          toast.error("Username is already taken", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      } else {
        toast.error("An error occurred during registration", {
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
      handleRegister();
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="RegisterMainDiv">
      <ToastContainer />
      <Box
        bg="#003354"
        w="27%"
        h="auto"
        minW="300px"
        p={4}
        color="#051923"
        borderRadius={34}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontSize="3xl" color="white" mb={8}>
          Register
        </Text>
        <InputGroup w="75%" mb={5}>
          <InputLeftElement pointerEvents="none" pr={4}>
            <FontAwesomeIcon icon={faUser} color="#0582ca" />
          </InputLeftElement>
          <Input
            variant="flushed"
            placeholder="Username"
            textColor="white"
            pl={7}
            mb={4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputGroup>
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
        <InputGroup w="75%" mb={3}>
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
        <Button colorScheme="blue" w="75%" onClick={handleRegister} mb={3}>
          Register
        </Button>
        <Text color={"white"}>
          Already have an account?
          <Link
            to="/login"
            style={{
              color: "#0582ca",
            }}
          >
            Login here
          </Link>
        </Text>
      </Box>
    </div>
  );
};

export default Register;
