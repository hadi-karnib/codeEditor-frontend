import "./adminNavbar.css";
import logo from "../../assets/logo.svg";
import files_icon from "../../assets/navbar/files.svg";
import Home_icon from "../../assets/navbar/Home.svg";
import messages_icon from "../../assets/navbar/messages.svg";
import { useNavigate } from "react-router-dom";
const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleFilesClick = () => {
    navigate("/files");
  };

  const handleMessagesClick = () => {
    navigate("/messages");
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <h2>Welcome Admin</h2>
        <button onClick={logout}>Log out</button>
      </nav>
    </div>
  );
};

export default AdminNavbar;
