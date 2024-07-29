import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/add.svg";
import Cobra_head_item from "./Cobra_head_item";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./HomePage.css"
const STORAGE_KEY = "codeFiles";

export default function HomePage() {
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [existingFiles, setExistingFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFiles = localStorage.getItem(STORAGE_KEY);
    if (storedFiles) {
      setExistingFiles(JSON.parse(storedFiles));
    }
  }, []);

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setFileName(`${e.target.value}-file`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName.trim() === "") {
      alert("File name cannot be empty");
      return;
    }

    const existingFileIndex = existingFiles.findIndex(
      (file) => file.name === fileName
    );
    if (existingFileIndex !== -1) {
      alert("A file with the same name already exists");
      return;
    }

    setIsSubmitting(true);

    const newFile = {
      name: fileName,
      language: language,
      content: ""
    };

    setTimeout(() => {
      const updatedFiles = [...existingFiles, newFile];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
      setExistingFiles(updatedFiles);

      setIsModalOpen(false);
      setIsSubmitting(false);
      navigate("/editor", { state: { fileName, language } });
    }, 2000);
  };

  const handleDelete = (index) => {
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
    setExistingFiles(updatedFiles);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="Home_page_container">
        <Navbar/>
            <div className="HomePage">
      <button onClick={toggleModal} className="create-button">
        Launch a Codra
        <img src={addIcon} alt="" className="add_icon" />
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit} className="create-form">
              <div className="form_input">
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="language-select"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="cpp">C++</option>
                  <option value="typescript">TypeScript</option>
                </select>
              </div>
              <div className="form_input">
                <label htmlFor="fileName">File Nam:</label>
                <input
                  type="text"
                  id="fileName"
                  value={fileName}
                  onChange={handleFileNameChange}
                  required
                  className="file-name-input"
                />
              </div>
              <button
                type="submit"
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
              >
                {isSubmitting ? "Launching..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
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
    <Footer/>

    </div>

  );
}