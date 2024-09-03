import React, { useState } from "react";

function Chat({ socket }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "") return;
    console.log("new msg");
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message
        },
      })
    );
    setMessage("");
  };

  return (
    <div className="chat">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Send MSG"
          className="text-center p-1 rounded"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="m-3 bg-black text-white p-1 rounded" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
