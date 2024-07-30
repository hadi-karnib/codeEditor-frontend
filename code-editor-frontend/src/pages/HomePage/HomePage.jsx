import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/add.svg";
import Cobra_head_item from "./Cobra_head_item";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./HomePage.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const HomePage = () => {
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [existingFiles, setExistingFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

    fetchUserCodes(token);
  }, [navigate]);

  const fetchUserCodes = async (token) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/userCodes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExistingFiles(response.data.data);
    } catch (error) {
      console.error("Error fetching user codes:", error);
    }
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setFileName(`${e.target.value}-file`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingFileIndex = existingFiles.findIndex(
      (file) => file.name === fileName
    );
    if (existingFileIndex !== -1) {
      alert("A file with the same name already exists");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/createCode",
        {
          language: language,
          source_code: "//enter your code",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newFile = response.data.data;
      setExistingFiles((prevFiles) => [...prevFiles, newFile]);

      setIsModalOpen(false);
      setIsSubmitting(false);
      console.log("handle submit");
      navigate("/editor", { state: { fileId: newFile.id } });
    } catch (error) {
      console.error("Error creating code file:", error);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (fileId, index) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete("http://127.0.0.1:8000/api/deleteCode", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: fileId,
        },
      });
      setExistingFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting code file:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (fileId) => {
    console.log(fileId);
    navigate("/editor", { state: { fileId } });
  };

  return (
    <div className="Home_page_container">
      <Navbar />
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
                <div className="form_input"></div>
                <button
                  type="submit"
                  className={`submit-button ${
                    isSubmitting ? "submitting" : ""
                  }`}
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
              language={file.language}
              onDelete={() => handleDelete(file.id, index)}
              onClick={() => handleCardClick(file.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
