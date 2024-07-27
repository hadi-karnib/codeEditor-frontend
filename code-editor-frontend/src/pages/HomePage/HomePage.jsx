import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/add.svg";
import Cobra_head_item from "./Cobra_head_item";
import {
  Button,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./HomePage.css";

export default function HomePage() {
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [existingFiles, setExistingFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const files = JSON.parse(localStorage.getItem("codeFiles")) || [];
    setExistingFiles(files);
  }, []);

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName.trim() === "") {
      alert("File name cannot be empty");
      return;
    }

    const newFile = {
      name: fileName,
      language: language,
      content: ""
    };

    const updatedFiles = [...existingFiles, newFile];
    localStorage.setItem("codeFiles", JSON.stringify(updatedFiles));
    setExistingFiles(updatedFiles);

    navigate("/editor", { state: { fileName, language } });
  };

  const handleDelete = (index) => {
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    localStorage.setItem("codeFiles", JSON.stringify(updatedFiles));
    setExistingFiles(updatedFiles);
  };

  return (
    <div className="HomePage">
      <Navbar />
      <div className="content">
        <Button colorScheme="blue" onClick={onOpen} px={20} py={6} fontWeight="light" fontSize="3xl">
          Launch a Codra
          <img src={addIcon} alt="" className="add_icon" />
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Code File</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="form-group">
                  <label htmlFor="language">Language:</label>
                  <Select id="language" value={language} onChange={handleLanguageChange}>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="typescript">TypeScript</option>
                  </Select>
                </div>
                <div className="form-group">
                  <label htmlFor="fileName">File Name:</label>
                  <Input
                    type="text"
                    id="fileName"
                    value={fileName}
                    onChange={handleFileNameChange}
                    required
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit" onClick={onClose}>
                  Submit
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <div className="cobras_head_list">
        {existingFiles.map((file, index) => (
          <Cobra_head_item 
            key={index} 
            name={file.name} 
            language={file.language} 
            onDelete={() => handleDelete(index)} 
          />
        ))}
      </div>
      </div>


      <Footer />
    </div>
  );
}
