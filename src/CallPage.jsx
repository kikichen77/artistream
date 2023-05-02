import { useLocation } from "react-router-dom";
import Room from "./VideoComponent";
import  { Navigate } from "react-router-dom";
import ChatBox from "./ChatBox"
import SocketIO from 'socket.io-client';
import React from 'react';

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
      <Room props={ROOM_ID}/>
      <ChatBox socket={socket}/>
    </React.Fragment>
  );
}