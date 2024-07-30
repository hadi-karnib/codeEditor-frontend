import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from "../firebase-config";

export default function Chat({ room }) { // Correctly destructuring room prop
    const [newMessage, setNewMessage] = useState("");

    // Reference the database and the collection
    const messagesRef = collection(db, "messages");

    // create state messages
    const [messages,setMessages]=useState([])
    // useeffect for rendering messages from different users on same room

    useEffect(()=>{
        const querryMessages = query(messagesRef,where("room","==",room),
        orderBy("createdAt"))
        const unsuscribe = onSnapshot(querryMessages,(snapshot)=>{
            let messages = [];

            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})

            });

            setMessages(messages)

        });

        return()=> unsuscribe();


    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") {
            return;
        }

        try {
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room: room,
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1>welcome to : {room.toUpperCase()}</h1>
            </div>
<div className="messages">
  {messages.map((message) => (
    // <h1 key={message.id}>{message.text}</h1>
    <div className="message" key={message.id}>
        <span className="user"> {message.user}</span>
        {message.text}
        {/* *
        {message.createdAt.toString()} */}
    </div>
  ))}
</div>

            {/* Functionality of adding messages */}
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="new-message-input"
                    placeholder="Type your message here"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
}
