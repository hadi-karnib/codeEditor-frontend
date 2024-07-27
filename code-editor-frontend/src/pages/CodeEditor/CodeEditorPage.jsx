import React, { useState } from "react";
import "./CodeEditor.css";
import Navbar from "../../components/navbar/navbar";
import CodeEditor from "../../components/code-editor/CodeEditor";
const Editor = () => {
  return (
    <div className="EditorMainDiv">
      <Navbar />
      <CodeEditor />
    </div>
  );
};

export default Editor;
