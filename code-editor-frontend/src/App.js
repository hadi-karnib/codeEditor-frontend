import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  );
}

export default App;
