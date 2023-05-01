import React from "react"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function ConnectPage() {
    const roomId = useRef(null);
    const navigate = useNavigate();

    const submitRoom = () => {
      if (roomId.current.value == "connect"){
        alert("Cannot use that name")
      }
      else{
        navigate("/"+roomId.current.value, { state: { ROOM_ID: roomId.current.value } })
      }
    }
  
    return (
    <div>
        <h1>Make/Join Room</h1>
        <form onSubmit={submitRoom}>
            <label>
              <input type="text" ref={roomId} />
            </label>
            <input type="submit"/>
        </form>
    </div>
    )
}