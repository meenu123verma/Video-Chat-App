import { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from 'react-router-dom'
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const url = "";
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join",{email,room})
      
    },
    [email, room,socket]
  );

  const handleJoinRoom = useCallback((data)=>{
    const { email, room } = data;
    console.log(email)
    navigate(`${url}/room/${room}`)
  },[navigate]);


  useEffect(()=>{
    socket.on("room:join", handleJoinRoom);
    return () => {
        socket.off('room:join');
    }
  },[socket,handleJoinRoom])

  return (
    <>
      <div>
        <h1>Looby Screen</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email-id</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
          />
          <br />
          <label htmlFor="room">Room Code</label>
          <input
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            id="room"
            value={room}
          />
          <br />
          <button>Join</button>
        </form>
      </div>
    </>
  );
};

export default LobbyScreen;
