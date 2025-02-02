import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Messages from "./pages/Messages/MessagesCore";
import Register from "./pages/Register/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import CodeEditor from "./pages/CodeEditor/CodeEditorPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/register" element={<Register />} />
      <Route path="/editor" element={<CodeEditor />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
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
