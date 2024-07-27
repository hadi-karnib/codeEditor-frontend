import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import "./MessagesStyle.css";
import Navbar from "../../components/navbar/navbar";

const pusher = new Pusher("YOUR_PUSHER_APP_KEY", {
  cluster: "YOUR_PUSHER_CLUSTER"
});

export default function MessagesCore() {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch contacts from your API or local storage
    const fetchedContacts = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Amigo" },
    ];
    setContacts(fetchedContacts);

    // Subscribe to Pusher channel
    const channel = pusher.subscribe("messages-channel");
    channel.bind("new-message", (data) => {
      if (data.contactId === activeContact?.id) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });

    return () => {
      pusher.unsubscribe("messages-channel");
    };
  }, [activeContact]);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    // Simulate fetching messages for the active contact from your API or local storage
    const fetchedMessages = [
      { sender: contact.name, content: "Hi there!" },
      { sender: "You", content: "Hello!" },
    ];
    setMessages(fetchedMessages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = { sender: "You", content: newMessage };
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  return (
    <div className="pagecontainer">
      <Navbar />
      <div className="Messages">
        <div className="contacts">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact ${activeContact?.id === contact.id ? "active" : ""}`}
              onClick={() => handleContactClick(contact)}
            >
              {contact.name}
            </div>
          ))}
        </div>
        <div className="chat">
          {activeContact ? (
            <>
              <div className="chat-header">{activeContact.name}</div>
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`chat-message ${message.sender === "You" ? "sent" : "received"}`}>
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-content">{message.content}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-active-contact">Select a contact to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}
