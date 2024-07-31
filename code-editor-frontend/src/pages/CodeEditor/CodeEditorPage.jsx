import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./CodeEditor.css";
import Navbar from "../../components/navbar/navbar";
import CodeEditor from "../../components/code-editor/CodeEditor";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const Editor = () => {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get the location object
  const { fileId } = location.state || {}; // Extract fileId from state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "user" && decodedToken.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    if (!fileId) {
      navigate("/home", { replace: true }); // Redirect to home if fileId is not present
      return;
    }
  }, [navigate, fileId]);

  return (
    <div className="EditorMainDiv">
      <Navbar />
      {fileId && <CodeEditor fileId={fileId} />}
    </div>
  );
};

export default Editor;
