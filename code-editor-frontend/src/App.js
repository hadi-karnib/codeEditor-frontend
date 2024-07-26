import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage/LandingPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { RouterProvider} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {
      <Route path="/" element={<LandingPage />} />

      /*
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<ServicesSection />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUsSection />} />
        <Route path="/Login" exact element={<Login />} />
      </Route> 
      */}
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
