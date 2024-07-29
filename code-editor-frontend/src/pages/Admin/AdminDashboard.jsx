import React, { useEffect, useState } from "react";
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

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUsers = async () => {
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
    getUsers();
  }, []);

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
      toast.success("user deleted successful!", {
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
      toast.error("user not deleted!", {
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

  return (
    <div>
      <AdminNavbar />
      <ToastContainer />
      <div className="adminPanelDiv">
        <div className="button-flex">
          <Button colorScheme="blue" w="200px" mb={3}>
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
    </div>
  );
};

export default AdminDashboard;
