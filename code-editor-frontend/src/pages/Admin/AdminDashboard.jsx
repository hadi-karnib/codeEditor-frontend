import React from "react";
import AdminNavbar from "../../components/admin/adminNavbar";
import "./AdminDashboard.css";
import {
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
} from "@chakra-ui/react";

const mockUserData = [
  { id: 1, username: "user1", email: "user1@example.com" },
  { id: 2, username: "user2", email: "user2@example.com" },
  { id: 3, username: "user3", email: "user3@example.com" },
];

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="adminPanelDiv">
        <div className="button-flex">
          <Button colorScheme="blue" w="200px" mb={3}>
            Add users by CSV
          </Button>
        </div>
        <div className="tableUsers">
          <TableContainer
            className="tableContainer"
            w={"60%"}
            p={"10px"}
            background={"#fff"}
            borderRadius={"12px"}
          >
            <Table className="table" variant="simple">
              <Thead className="thead">
                <Tr>
                  <Th className="th" w="33.33%">
                    ID
                  </Th>
                  <Th className="th" w="33.33%">
                    Username
                  </Th>
                  <Th className="th" w="33.33%">
                    Email
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockUserData.map((user) => (
                  <Tr key={user.id}>
                    <Td className="td">{user.id}</Td>
                    <Td className="td">{user.username}</Td>
                    <Td className="td">{user.email}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot className="tfoot">
                <Tr>
                  <Th className="th" w="33.33%">
                    ID
                  </Th>
                  <Th className="th" w="33.33%">
                    Username
                  </Th>
                  <Th className="th" w="33.33%">
                    Email
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
