import React from "react"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function ConnectPage() {
    const roomId = useRef(null);
    const userName = useRef(null);
    const navigate = useNavigate();

    const makeRoom = (e) => {
      e.preventDefault();
      const makeRoomId = uuidv4();
      navigate("/room", { state: { ROOM_ID: makeRoomId } })
    }

    const submitName = (e) => {
      e.preventDefault();
      sessionStorage.setItem('username', userName.current.value);
      alert('username set')
    };

    const submitRoom = (e) => {
      e.preventDefault();
      if (roomId.current.value == "connect"){
        alert("Cannot use that name")
      }
      else{
        navigate("/room", { state: { ROOM_ID: roomId.current.value } })
      }
    }
  
    return (
    <div>
      <h1>Username</h1>
        <form onSubmit={submitName}>
            <label>
              <input type="text" ref={userName} />
            </label>
            <input type="submit"/>
        </form>

      <h1>Make/Join Room</h1>
        <form onSubmit={submitRoom}>
            <label>
              <input type="text" ref={roomId} />
            </label>
            <input type="submit" value="Join Room"/>
        </form>

        <input type="button" onClick={makeRoom} value = "Make Room"/>
    </div>
    )
}