import { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import "./MessagesStyle.css";
import Cookies from 'universal-cookie';
import Chat from "./components/Chat";

const cookies = new Cookies();

export default function MessageCore() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState("");
    const roomInputRef = useRef(null);

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
        <div>
            {room ? (
                <Chat room={room} />
            ) : (
                <div className="room">
                    <label htmlFor="">Enter Room Name:</label>
                    <input type="text" ref={roomInputRef} />
                    <button className="add_chat" onClick={handleEnterChat}>Enter Chat</button>
                </div>
            )}
        </div>
    );
}
