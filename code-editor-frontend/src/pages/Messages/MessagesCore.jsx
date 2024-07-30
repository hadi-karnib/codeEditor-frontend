import { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import "./MessagesStyle.css";
import Cookies from 'universal-cookie';
import Chat from "./components/Chat";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {signOut} from 'firebase/auth';
import {  auth} from "./firebase-config";
import illustration from "../../assets/message_illustration.svg"
const cookies = new Cookies();


export default function MessageCore() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState("");
    const roomInputRef = useRef(null);


    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
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
          <Navbar/>
            
          <div className="messenger_container">


          {room ? (
                <Chat room={room} />
            ) : (
                <div className="room">
                    <input type="text" ref={roomInputRef} placeholder="Enter Your Room" className="room_text"/>

                    <button className="add_chat" onClick={handleEnterChat}>Enter Chat</button>
                </div>
            )}

            <div className="sign-out">
                <button color="black" onClick={signUserOut}>Sign out</button>
            </div>
          </div>
            <Footer/>
        </div>
    );
}
