import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import
import "./CodeEditor.css";
import Navbar from "../../components/navbar/navbar";
import CodeEditor from "../../components/code-editor/CodeEditor";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const Editor = () => {
  const navigate = useNavigate(); // Initialize navigate

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
  }, [navigate]);

  return (
    <div className="EditorMainDiv">
      <Navbar />
      <CodeEditor />
    </div>
  );
};

export default Editor;
