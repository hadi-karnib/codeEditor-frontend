import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/adminNavbar";
import "./AdminDashboard.css";
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Input,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Dropzone from "react-dropzone";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true }); // Use replace to prevent going back
      return;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "admin") {
      navigate("/login", { replace: true }); // Use replace to prevent going back
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const userget = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(userget.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          id: id,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("User not deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null); // Clear the file state when modal is closed
  };

  const handleFileUpload = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleFileSubmit = async () => {
    if (!file) {
      toast.error("Please select a file!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("File uploaded successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      closeModal(); // Close the modal after successful upload
      fetchUsers(); // Fetch the updated list of users
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <AdminNavbar />
      <ToastContainer />
      <div className="adminPanelDiv">
        <div className="button-flex">
          <Button colorScheme="blue" w="200px" mb={3} onClick={openModal}>
            Add users by CSV
          </Button>
        </div>
        <Box mb={4}>
          <Input
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="70%"
            mb={2}
            color={"white"}
          />
        </Box>
        <div className="tableUsers">
          <TableContainer
            className="tableContainer"
            w={"70%"}
            background={"#fff"}
            borderRadius={"12px"}
          >
            <Table className="table" variant="simple">
              <Thead className="thead">
                <Tr>
                  <Th className="th" flex="25%" color={"white"}>
                    ID
                  </Th>
                  <Th className="th" w="25%" color={"white"}>
                    Username
                  </Th>
                  <Th className="th" w="35%" color={"white"}>
                    Email
                  </Th>
                  <Th className="th" w="25%" color={"white"}>
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td className="td">{user.id}</Td>
                    <Td className="td">{user.username}</Td>
                    <Td className="td">{user.email}</Td>
                    <Td className="td">
                      <Button
                        colorScheme="red"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot className="tfoot">
                <Tr>
                  <Th className="th" w="25%" color={"white"}>
                    ID
                  </Th>
                  <Th className="th" w="25%" color={"white"}>
                    Username
                  </Th>
                  <Th className="th" w="25%" color={"white"}>
                    Email
                  </Th>
                  <Th className="th" w="25%" color={"white"}>
                    Actions
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Upload CSV File"
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <h2>Upload CSV File</h2>
        <div className="dropzone">
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  style={{
                    border: "2px dashed #007bff",
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop a file here, or click to select a file</p>
                  <p style={{ color: "#007bff" }}>Click here to upload</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {file && <p>Selected file: {file.name}</p>}
        <Button colorScheme="blue" onClick={handleFileSubmit}>
          Submit
        </Button>
        <Button colorScheme="gray" onClick={closeModal} ml={3}>
          Cancel
        </Button>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
