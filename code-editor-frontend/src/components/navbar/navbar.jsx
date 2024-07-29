import "./navbar.css";
import logo from "../../assets/logo.svg";
import files_icon from "../../assets/navbar/files.svg";
import Home_icon from "../../assets/navbar/Home.svg";
import messages_icon from "../../assets/navbar/messages.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
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
    <nav>
      <img src={logo} alt="Logo" className="logo" />

      <ul className="nav_list">
        <li className="nav_list_item" onClick={handleHomeClick}>
          <img src={Home_icon} alt="Home" />
          Home
        </li>
        <li className="nav_list_item" onClick={handleFilesClick}>
          <img src={files_icon} alt="My Files" />
          My Files
        </li>
        <li className="nav_list_item" onClick={handleMessagesClick}>
          <img src={messages_icon} alt="Messages" />
          Messages
        </li>
      </ul>

      <button onClick={logout}>Log out</button>
    </nav>
  );
}
