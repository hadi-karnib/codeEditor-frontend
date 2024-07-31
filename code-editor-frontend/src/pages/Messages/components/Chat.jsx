import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const userName = cookies.get("user-name"); // Retrieve the user name from cookies

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: userName, // Use the user name from cookies
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
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
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
