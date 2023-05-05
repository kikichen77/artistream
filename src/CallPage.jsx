import { useLocation } from "react-router-dom";
import  { Navigate } from "react-router-dom";
import SocketIO from 'socket.io-client';
import React from 'react';
import Room from "../Components/VideoComponent";
import ChatBox from "../Components/Chat/ChatBox";
import CopyID from "../Components/CopyComponent";
<<<<<<< HEAD
import Canvas from "../Components/Canvas/Canvas";

=======
>>>>>>> def742ef236e614425bc3d32a85e09605938febc

export default function CallPage() {
  const {state} = useLocation();
  if (!state){
    return <Navigate to="/error"/>
  }
  
  const { ROOM_ID } = state;
  console.log("Page - Room ID:"+ROOM_ID)
  
  let socket = SocketIO("http://localhost:3000")
  return (
    <React.Fragment>
      <CopyID props={ROOM_ID}/>
      <Room props={ROOM_ID}/>
<<<<<<< HEAD
    <Canvas socket={socket}/>
      <ChatBox socket={socket}/>
    </React.Fragment>
  );
} 
=======
      <ChatBox socket={socket}/>
    </React.Fragment>
  );
} 
>>>>>>> def742ef236e614425bc3d32a85e09605938febc
