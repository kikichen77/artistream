import React from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from './createroom';
import {useState } from 'react';
import WhiteboardPage from "./WhiteboardComponents/WhiteboardPage";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');

const App = () => {
  // const { user } = useContext(AuthContext);
  //const [username, setUsername] = useState("");
  //<Route path={`whiteboard/room/${username}`} element={<CreateRoom username={username}/>} />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}exact />
        <Route path="whiteboard/:id" element={<WhiteboardPage createRoomComponent={<CreateRoom/>} socket={socket}/>}> 
          
        </Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
