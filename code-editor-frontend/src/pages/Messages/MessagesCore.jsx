import { useState, useRef } from "react";
import Cookies from 'universal-cookie';
import { getAuth, signOut } from 'firebase/auth';
import { Auth } from "./components/Auth";
import Chat from "./components/Chat";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import illustration from "../../assets/message_illustration.svg";
import "./MessagesStyle.css";

const cookies = new Cookies();

export default function MessageCore() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(getAuth());
    cookies.remove("auth-token");
    cookies.remove("user-name");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  const handleEnterChat = () => {
    setRoom(roomInputRef.current.value);
  };

  return (
    <div className="messenger_page">
      <Navbar />
      <div className="messenger_container">
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room">
            <input type="text" ref={roomInputRef} placeholder="Enter Your Room" className="room_text" />
            <button className="add_chat" onClick={handleEnterChat}>Enter Chat</button>
          </div>
        )}
        <div className="sign-out">
          <button color="black" onClick={signUserOut}>Sign out</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
